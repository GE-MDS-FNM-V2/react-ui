import { connect } from 'react-redux';
import Home from '../components/home';
import { fetchMockApi } from '../store/actions/mockApi';
import { fetchSerial } from '../store/actions/serial';

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    fetchMockApi: () => dispatch(fetchMockApi()),
    fetchSerial: () => dispatch(fetchSerial())
  };
};

const mapStateToProps = state => {
  return {
    mockApi: state.mockApi,
    serial: state.serial,
    inElectron: state.inElectron
  };
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default MainContainer;
