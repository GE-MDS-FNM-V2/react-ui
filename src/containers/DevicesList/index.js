import { connect } from 'react-redux';
import DevicesList from '../../components/DevicesList';
import { selectDevice } from '../../store/actions/selectedDevice';

const mapStateToProps = state => {
  return {
    devices: state.devices,
    selectedDevice: state.selectedDevice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    selectDevice: id => dispatch(selectDevice(id))
  };
};

const ComponentWithData = connect(
  mapStateToProps,
  mapDispatchToProps
)(DevicesList);

export default ComponentWithData;
