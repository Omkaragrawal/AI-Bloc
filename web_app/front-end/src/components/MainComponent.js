//Dependencies
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import useLocalstorage from "@rooks/use-localstorage";

//Extra Files
import logo from '../logo.svg';
import '../App.css';

//Components
import RegistrationForm from './signup';
import LoginForm from './Login';
import registerSuccess from './registerSuccess';


function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          </a>
      </header>
    </div>
  );
}


const MainComponent = (props) => {

  const refreshToken = useLocalstorage("refreshToken", undefined);
  const accessToken = useLocalstorage("accessToken", undefined);

  let axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
  });
  // axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken[0]}`;


  return (
    <Switch location={props.location} timeout={3000}>
      <Route path="/" exact component={HomePage} />
      <Route path="/signup">
        <RegistrationForm axios={axiosInstance} accessToken={accessToken} refreshToken={refreshToken} />
      </Route>
      <Route path="/login">
        <LoginForm axios={axiosInstance} accessToken={accessToken} refreshToken={refreshToken} />
      </Route>
      <Route path="/registration-successful" component={registerSuccess} />
      <Redirect to="/" />
    </Switch>
  );
}
export default MainComponent;