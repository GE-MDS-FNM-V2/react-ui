import { connect } from 'react-redux';
import DeviceInspector from '../../components/DeviceInspector';
import {
  queryDeviceInfo,
  setDeviceInspectorActiveTab
} from '../../store/actions/devices';

const mapStateToProps = state => {
  return {
    devices: state.devices,
    selectedDevice: state.selectedDevice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    queryDeviceInfo: id => dispatch(queryDeviceInfo(id)),
    setDeviceInspectorActiveTab: id => dispatch(setDeviceInspectorActiveTab(id))
  };
};

const ComponentWithData = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceInspector);

export default ComponentWithData;
