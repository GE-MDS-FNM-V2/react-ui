import { connect } from 'react-redux';
import LoadDevicesConfiguration from '../../components/LoadDevicesConfiguration';
import { addDevice } from '../../store/actions/devices';

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    addDevice: deviceConfig => dispatch(addDevice(deviceConfig))
  };
};

const MainContainer = connect(
  null,
  mapDispatchToProps
)(LoadDevicesConfiguration);

export default MainContainer;
