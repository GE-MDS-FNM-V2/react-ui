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

import './index.css';

export default ({
  devices,
  selectedDevice,
  queryDeviceInfo,
  setDeviceInspectorActiveTab
}) => {
  if (selectedDevice == null) {
    return <p>No device selected</p>;
  }
  const device = devices.filter(device => {
    return device.id === selectedDevice;
  })[0];
  const activeTab = device.deviceInspectorSelectedTab;
  return (
    <div>
      <h2>{device.name}</h2>
      {device.loading && <Spinner />}
      {!device.loading && (
        <TabContent>
          <Button onClick={() => queryDeviceInfo(device.id)}>Refresh</Button>
          <Nav tabs>
            {Object.keys(device.data).map(tabTitle => {
              return (
                <NavItem>
                  <NavLink
                    active={activeTab === tabTitle}
                    onClick={() => {
                      setDeviceInspectorActiveTab(tabTitle);
                    }}
                  >
                    {tabTitle}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent activeTab={activeTab}>
            {Object.keys(device.data).map(tabTitle => {
              return (
                <TabPane tabId={tabTitle}>
                  {JSON.stringify(device.data[tabTitle], null, 4)}
                </TabPane>
              );
            })}
          </TabContent>
        </TabContent>
      )}
    </div>
  );
};
