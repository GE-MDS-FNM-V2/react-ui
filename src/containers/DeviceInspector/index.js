import { connect } from 'react-redux';
import DeviceInspector from '../../components/DeviceInspector';
import { selectDeviceInspectorTab } from '../../store/actions/deviceInspector';
const mapStateToProps = state => {
  return {
    devices: state.devices,
    selectedDevice: state.selectedDevice,
    selectedDeviceInspectorTabId: state.deviceInspector.selectedTabId,
    deviceInspectorTabs: state.deviceInspector.tabs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    selectDeviceInspectorTab: id => dispatch(selectDeviceInspectorTab(id))
  };
};

const ComponentWithData = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInspector);

export default ComponentWithData;
