import { Device, ERROR_NO_RESPONSE_FOUND } from '../store/devices/types';
import { executeCommunication } from '@ge-fnm/csm';
import { v1, ActionTypeV1, ActionObjectV1 } from '@ge-fnm/action-object';
import { YangParser, DataType, Map } from '@ge-fnm/data-model';

export const DEFAULT_ROOT_NODES = [
  {
    name: 'interfaces',
    path: 'if:interfaces'
  }
  // {
  //   name: 'services',
  //   path: 'serv:services'
  // }
];

export type IAPIRunAction = (
  deviceID: string,
  actionObject: ActionObjectV1
) => Promise<DataType>;
/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class DeviceApiManager {
  private static instance: DeviceApiManager;
  private initializedDevices: {
    [key: string]: {
      deviceObject: Device;
      data?: DataType;
    };
  };

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.initializedDevices = {};
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): DeviceApiManager {
    if (!DeviceApiManager.instance) {
      DeviceApiManager.instance = new DeviceApiManager();
    }

    return DeviceApiManager.instance;
  }

  public runAction: IAPIRunAction = async (
    deviceID: string,
    actionObject: ActionObjectV1
  ) => {
    if (!Object.keys(this.initializedDevices).includes(deviceID)) {
      throw new Error(
        `The Device "${deviceID}" has not been initialized yet. Cannot run an action until the device has been initialized`
      );
    }
    const serializedResponseActionObject = await executeCommunication(
      actionObject.serialize()
    );
    const deserializedResponseActionObject = v1.deserialize(
      serializedResponseActionObject
    );

    const response = deserializedResponseActionObject.information.response;

    try {
      if (response) {
        if (response.data) {
          const rawReponse = response.data;
          const jsonResponse = JSON.parse(rawReponse);
          const error = jsonResponse.error;
          if (error) {
            throw error;
          }
          const data = jsonResponse.result.data;
          const parser = new YangParser();
          const parsed = parser.parseData(data);

          this.getDeviceByID(deviceID).data = parsed;
          return parsed;
        } else {
          throw response.error;
        }
      } else {
        throw ERROR_NO_RESPONSE_FOUND;
      }
    } catch (error) {
      throw error;
    }
  };

  public getEntireSchema = async (deviceID: string): Promise<Map> => {
    const device = this.getDeviceByID(deviceID);
    const results = DEFAULT_ROOT_NODES.map(async rootNode => {
      const actionObject = v1.create({
        version: 1,
        uri: device.deviceObject.uri,
        actionType: ActionTypeV1.GET,
        path: [rootNode.path],
        commData: {
          commMethod: device.deviceObject.communicationMethod,
          protocol: device.deviceObject.protocol,
          username: device.deviceObject.username,
          password: device.deviceObject.password
        }
      });
      const response = await this.runAction(deviceID, actionObject);
      return {
        name: rootNode.name,
        path: rootNode.path,
        response
      };
    });

    const root = new Map({
      name: 'root',
      children: undefined,
      permissions: {
        create: true,
        read: true,
        update: true,
        delete: true,
        execute: true
      }
    });

    await (await Promise.all(results)).forEach(result => {
      root.set(result.name, result.response);
    });

    return root;
  };

  public initializeDevice = async (device: Device) => {
    let init_action = v1
      .create({
        version: 1,
        actionType: ActionTypeV1.INIT,
        commData: {
          commMethod: device.communicationMethod,
          protocol: device.protocol,
          username: device.username,
          password: device.password
        },
        modifyingValue: '',
        path: [],
        response: {
          data: null,
          error: null
        },
        uri: device.uri
      })
      .serialize();
    const result = await executeCommunication(init_action);
    const resultAsActionObject = v1.deserialize(result);
    this.initializedDevices[device.id] = {
      deviceObject: device
    };
    return resultAsActionObject;
  };

  public getDeviceByID = (deviceID: string) => {
    return this.initializedDevices[deviceID];
  };
}
