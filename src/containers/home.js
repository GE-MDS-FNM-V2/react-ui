import { connect } from 'react-redux';
import Home from '../components/home';

const mapStateToProps = state => {
  return {
    result: state.result,
    fetchingResult: state.fetchingResult,
    error: state.error,
    inElectron: state.inElectron
  };
};

const MainContainer = connect(mapStateToProps)(Home);

export default MainContainer;
