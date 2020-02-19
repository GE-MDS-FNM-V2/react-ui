import { Device } from "../store/devices/types";
import { executeCommunication } from "@ge-fnm/csm";
import { v1, ActionTypeV1, ActionObjectInformationV1 } from "@ge-fnm/action-object";

/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export class DeviceApiManager {
  private static instance: DeviceApiManager;
  private initializedDevices: { [key: string]: string };

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

  public runAction = async (device: Device, actionInformation: ActionObjectInformationV1) => {
      if(!Object.keys(this.initializedDevices).includes(device.id)){
            throw new Error(`The Device "${device.id}" has not been initialized yet. Cannot run an action until the device has been initialized`) 
      }

      const action = v1.create(actionInformation).serialize()
      const result = await executeCommunication(action)
      return result
  }

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
        modifyingValue: "",
        path: [],
        response: {
          data: null,
          error: null
        },
        uri: device.uri
      })
      .serialize();
    const result = await executeCommunication(init_action);
    const resultAsActionObject = v1.deserialize(result)
    return resultAsActionObject
  };
}
