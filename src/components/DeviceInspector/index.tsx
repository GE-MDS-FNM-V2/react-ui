import React from 'react';
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Spinner
} from 'reactstrap';

import { DevicesState } from '../../store/devices/types';
import { IAPIRunAction } from '../../api';
import { v1, ActionTypeV1, IActionObjectV1 } from '@ge-fnm/action-object';
import { useState } from 'react';

export default ({
  devicesState,
  runAction
}: {
  devicesState: DevicesState;
  runAction: IAPIRunAction;
}) => {
  const selectedDevice = devicesState.selectedDeviceID;
  const devices = devicesState.devices;

  const [result, setResult] = useState<IActionObjectV1 | undefined>(undefined);
  if (selectedDevice == null) {
    return <p>No device selected</p>;
  }
  const device = devices.filter(device => {
    return device.id === selectedDevice;
  })[0];

  const getSNMP = async () => {
    const snmpResponse = v1.deserialize(
      await runAction(
        device,
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
        }).information
      )
    );
    setResult(snmpResponse);
  };
  return (
    <div>
      <h2>{device.uri}</h2>
      {device.loading && <Spinner />}
      {!device.loading && (
        <TabContent>
          <pre>{JSON.stringify(device, null, 4)}</pre>
          <button onClick={() => getSNMP()}>Get SNMP value</button>
          <pre>{JSON.stringify(result, null, 4)}</pre>
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
