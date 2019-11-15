import { connect } from 'react-redux';
import LoadDevicesConfiguration from '../../components/LoadDevicesConfiguration';
import { setDevices } from '../../store/actions/devices';

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    setDevices: devices => dispatch(setDevices(devices))
  };
};

const MainContainer = connect(
  null,
  mapDispatchToProps
)(LoadDevicesConfiguration);

export default MainContainer;
