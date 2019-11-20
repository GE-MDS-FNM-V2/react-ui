import { connect } from 'react-redux';
import Home from '../../components/Home';
import { getLogin } from '../../store/actions/login';

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    getLogin: () => dispatch(getLogin())
  };
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default MainContainer;
