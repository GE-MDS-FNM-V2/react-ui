import React from 'react';
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';

import './index.css';

export default ({
  devices,
  selectedDevice,
  selectedDeviceInspectorTabId,
  deviceInspectorTabs,
  selectDeviceInspectorTab
}) => {
  if (selectedDevice == null) {
    return <p>No device selected</p>;
  }
  const device = devices.filter(device => {
    return device.id === selectedDevice;
  })[0];
  return (
    <div>
      <Nav tabs>
        {deviceInspectorTabs.map(tab => {
          return (
            <NavItem>
              <NavLink
                active={selectedDeviceInspectorTabId === tab.id}
                onClick={() => selectDeviceInspectorTab(tab.id)}
              >
                {tab.title}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      <TabContent activeTab={selectedDeviceInspectorTabId}>
        {deviceInspectorTabs.map(tab => {
          return (
            <TabPane tabId={tab.id}>
              <p>this is tab content</p>
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  );
};
