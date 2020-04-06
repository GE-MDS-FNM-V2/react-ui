import {
  Device,
  ERROR_NO_RESPONSE_FOUND,
  DeviceErrorType
} from '../store/devices/types';
import { executeCommunication } from '@ge-fnm/csm';
import { v1, ActionTypeV1, ActionObjectV1 } from '@ge-fnm/action-object';
import { YangParser, DataType, Map } from '@ge-fnm/data-model';

export const DEFAULT_ROOT_NODES = [
  {
    name: 'interfaces',
    path: 'if:interfaces'
  },
  {
    name: 'services',
    path: 'serv:services'
  }
];

export type IAPIRunActionResult = {
  errors?: DeviceErrorType[];
  data?: DataType;
};
export type IAPIRunAction = (
  deviceID: string,
  actionObject: ActionObjectV1
) => Promise<IAPIRunActionResult>;

export const extractPathFromActionObject = (
  actionObject: ActionObjectV1
): string[] => {
  if (actionObject.information.path) {
    return actionObject.information.path?.join('').split('/'); // this is caused by a bug in pam. When it is fixed this will need to be changed
  } else {
    return [];
  }
};
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
    // use this as a switch board to select the proper action to be performed
    if (actionObject.information.actionType === ActionTypeV1.SET) {
      return this.runSetAction(deviceID, actionObject);
    } else {
      return this.runGetAction(deviceID, actionObject);
    }
  };

  private runGetAction: IAPIRunAction = async (
    deviceID: string,
    actionObject: ActionObjectV1
  ): Promise<IAPIRunActionResult> => {
    const serializedResponseActionObject = await executeCommunication(
      actionObject.serialize(),
      process.env.REACT_APP_CSM_FORWARDING_ADDRESS
    );
    const deserializedResponseActionObject = v1.deserialize(
      serializedResponseActionObject
    );

    const response = deserializedResponseActionObject.information.response;
    try {
      if (response) {
        if (response.data) {
          /**
           * TODO - response.data.result is a json-rpc specific property - eventually you will want to modify the dataModel parser to accept the entire response,
           * and then return a data model
           *
           * as opposed to what we do now, which is manually grab the root schema node off of the jsonrpc response
           */

          const data = response.data.result.data;
          const parser = new YangParser();
          const parsed = parser.parseData(data);

          this.getDeviceByID(deviceID).data = parsed;
          return {
            data: parsed
          };
        } else if (response.error) {
          throw response.error; // to be caught down below
        }
      } else {
        throw ERROR_NO_RESPONSE_FOUND; // to be caught down below
      }
    } catch (error) {
      return {
        errors: [
          {
            errorObj: error,
            path: extractPathFromActionObject(actionObject)
          }
        ]
      };
    }
  };

  private runSetAction: IAPIRunAction = async (
    deviceID: string,
    actionObject: ActionObjectV1
  ): Promise<IAPIRunActionResult> => {
    try {
      const serializedResponseActionObject = await executeCommunication(
        actionObject.serialize(),
        process.env.REACT_APP_CSM_FORWARDING_ADDRESS
      );

      // If we got a response from the radio, but the response was some type of error
      const deserializedResponseActionObject = v1.deserialize(
        serializedResponseActionObject
      );
      if (deserializedResponseActionObject.information.response?.error) {
        throw new Error(
          deserializedResponseActionObject.information.response?.error
        ); // caught down below
      }

      //If everything worked
      const data = await this.getEntireSchema(deviceID); // IF YOU CHANGE THIS, please read comment below about performance optimization
      return {
        data
      };
    } catch (error) {
      // this would be something like a network connection error
      return {
        errors: [
          {
            errorObj: error,
            path: extractPathFromActionObject(actionObject)
          }
        ]
      };
    }

    /**
     * PERFORMANCE OPTIMIZATION
     * If performance becomes too slow, we might not want to refetch the entire schema (this.getEntireSchema)
     * but for now this is fine and a lot cleaner than the alternative
     *
     * If we were to do the alternative of only re-fetching the updated node, we should also investigate if nodes can affect
     * nodes that are not its children.
     *
     *
     * For example, I think the following might happen in some cases (not confirmed, just a hunch)
     *
     * You modify A.property and it somehow changed B.property even though B is not a child of A
     * Ex:
     * {
     *    A: ...,
     *    B: ...
     *
     * }
     *
     * The bug might arise when you think you only have to refetch node A, but now node B is out of date
     */
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
      // This is dirty, but only times this would break is if a configured ROOT_NODE isnt valid, or the network disconnected inbetween root node requests
      root.set(result.name, result.response.data as Map);
    });

    // Eventually we might want to make this data property immutable, and instead
    // almost "version" the data property under a uuid
    this.getDeviceByID(deviceID).data = root;
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
    const result = await executeCommunication(
      init_action,
      process.env.REACT_APP_CSM_FORWARDING_ADDRESS
    );
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
