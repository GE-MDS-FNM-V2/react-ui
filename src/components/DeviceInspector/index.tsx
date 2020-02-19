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

export default ({
  devicesState,
}: {devicesState: DevicesState}) => {
    const selectedDevice = devicesState.selectedDeviceID
    const devices = devicesState.devices
  if (selectedDevice == null) {
    return <p>No device selected</p>;
  }
  const device = devices.filter(device => {
    return device.id === selectedDevice;
  })[0];
  return (
    <div>
      <h2>{device.uri}</h2>
      {device.loading && <Spinner />}
      {!device.loading && (
          <pre>{JSON.stringify(device, null, 4)}</pre>
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
