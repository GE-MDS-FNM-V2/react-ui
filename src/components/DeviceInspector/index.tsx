import React from 'react';
import { TabContent, Spinner } from 'reactstrap';
import { DevicesState } from '../../store/devices/types';
import { v1, ActionTypeV1, ActionObjectV1 } from '@ge-fnm/action-object';
import { DataType } from '@ge-fnm/data-model';
import ModelUI from '../ModelUI';

export default ({
  devicesState,
  runAction,
  deviceData
}: {
  deviceData?: DataType;
  devicesState: DevicesState;
  runAction: (deviceID: string, actionObject: ActionObjectV1) => void;
}) => {
  const selectedDeviceID = devicesState.selectedDeviceID;
  const devices = devicesState.devices;

  // const [inputText, setInputText] = useState('');
  if (selectedDeviceID == null) {
    return <p>No device selected</p>;
  }
  const device = devices.filter(device => {
    return device.id === selectedDeviceID;
  })[0];

  const errors = device.errors;

  const setValue = async (valuePath: string, modifyingValue: string) => {
    runAction(
      selectedDeviceID,
      v1.create({
        version: 1,
        actionType: ActionTypeV1.SET,
        commData: {
          commMethod: device.communicationMethod,
          protocol: device.protocol,
          username: device.username,
          password: device.password
        },
        modifyingValue: modifyingValue,
        path: [valuePath],
        response: {
          error: null,
          data: null
        },
        uri: device.uri
      })
    );
  };

  // const getSNMP = async () => {
  //   runAction(
  //     selectedDeviceID,
  //     v1.create({
  //       version: 1,
  //       actionType: ActionTypeV1.GET,
  //       commData: {
  //         commMethod: device.communicationMethod,
  //         protocol: device.protocol,
  //         username: device.username,
  //         password: device.password
  //       },
  //       path: ['/serv:services/snmp:snmp/agent/enabled'],
  //       response: {
  //         error: null,
  //         data: null
  //       },
  //       uri: device.uri
  //     })
  //   );
  // };

  // const setSNMP = async () => {
  //   runAction(
  //     selectedDeviceID,
  //     v1.create({
  //       version: 1,
  //       actionType: ActionTypeV1.SET,
  //       commData: {
  //         commMethod: device.communicationMethod,
  //         protocol: device.protocol,
  //         username: device.username,
  //         password: device.password
  //       },
  //       modifyingValue: inputText,
  //       path: ['/serv:services/snmp:snmp/agent/enabled'],
  //       response: {
  //         error: null,
  //         data: null
  //       },
  //       uri: device.uri
  //     })
  //   );
  // };

  return (
    <div>
      <h2>{device.uri}</h2>

      {/* {!device.loading && ( */}
      <TabContent>
        {/* <pre>{JSON.stringify(device, null, 4)}</pre>
          <button onClick={() => getSNMP()}>Get SNMP value</button> */}
        {device.loading && <Spinner />}
        {deviceData && (
          <ModelUI model={deviceData} setValue={setValue} errors={errors} />
        )}
        {/* <select
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          >
            <option>true</option>
            <option>false</option>
          </select>
          <button onClick={() => setSNMP()}>Set SNMP value</button> */}
      </TabContent>
      {/* )} */}
    </div>
  );
};
