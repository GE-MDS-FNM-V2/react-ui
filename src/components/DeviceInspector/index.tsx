import React from 'react';
import { TabContent, Spinner } from 'reactstrap';
import { DevicesState } from '../../store/devices/types';
import { v1, ActionTypeV1, ActionObjectV1 } from '@ge-fnm/action-object';
import { useState } from 'react';

export default ({
  devicesState,
  runAction
}: {
  devicesState: DevicesState;
  runAction: (deviceID: string, actionObject: ActionObjectV1) => void;
}) => {
  const selectedDeviceID = devicesState.selectedDeviceID;
  const devices = devicesState.devices;

  const [inputText, setInputText] = useState('');
  if (selectedDeviceID == null) {
    return <p>No device selected</p>;
  }
  const device = devices.filter(device => {
    return device.id === selectedDeviceID;
  })[0];

  const getSNMP = async () => {
    runAction(
      selectedDeviceID,
      v1.create({
        version: 1,
        actionType: ActionTypeV1.GET,
        commData: {
          commMethod: device.communicationMethod,
          protocol: device.protocol,
          username: device.username,
          password: device.password
        },
        path: ['/serv:services/snmp:snmp/agent/enabled'],
        response: {
          error: null,
          data: null
        },
        uri: device.uri
      })
    );
  };

  const setSNMP = async () => {
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
        modifyingValue: inputText,
        path: ['/serv:services/snmp:snmp/agent/enabled'],
        response: {
          error: null,
          data: null
        },
        uri: device.uri
      })
    );
  };

  return (
    <div>
      <h2>{device.uri}</h2>
      {device.loading && <Spinner />}
      {!device.loading && (
        <TabContent>
          <pre>{JSON.stringify(device, null, 4)}</pre>
          <button onClick={() => getSNMP()}>Get SNMP value</button>

          <select
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          >
            <option>true</option>
            <option>false</option>
          </select>
          <button onClick={() => setSNMP()}>Set SNMP value</button>
        </TabContent>

        // <TabContent>
        //   {/* <Button onClick={() => queryDeviceInfo(device.id)}>Refresh</Button> */}
        //   <Nav tabs>
        //     {Object.keys(device.data).map(tabTitle => {
        //       return (
        //         <NavItem key={`${tabTitle}-tab-link`}>
        //           <NavLink
        //             active={activeTab === tabTitle}
        //             onClick={() => {
        //               setDeviceInspectorActiveTab(tabTitle);
        //             }}
        //           >
        //             {tabTitle}
        //           </NavLink>
        //         </NavItem>
        //       );
        //     })}
        //   </Nav>
        //   <TabContent activeTab={activeTab}>
        //     {Object.keys(device.data).map(tabTitle => {
        //       return (
        //         <TabPane tabId={tabTitle} key={`${tabTitle}-tab-pane`}>
        //           {JSON.stringify(device.data[tabTitle], null, 4)}
        //         </TabPane>
        //       );
        //     })}
        //   </TabContent>
        // </TabContent>
      )}
    </div>
  );
};
