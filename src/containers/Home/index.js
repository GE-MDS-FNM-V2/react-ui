import { connect } from 'react-redux';
import Home from '../../components/Home';

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
  };
};

const mapStateToProps = state => {
  return {};
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default MainContainer;
