import React, { useEffect, useState } from 'react';
import {Switch, Route} from 'react-router-dom';
import { useThunkDispatch } from './hooks';
import { setToken } from '../features/auth/actions';
import { signinUser } from '../features/auth/actions';
import Navigation from '../features/Navigation/Navigation';
import AuthForm from '../features/auth/components/AuthForm';
import ImageLinkForm from '../features/ImageRecognition/components/ImageLinkForm';
import Profile from '../features/profile/components/Profile';
import './App.css';

interface IUser {
  name: string,
  age: number,
}

interface IAppProps {
}

interface IAppState {
  user: IUser,
  authFormSignup: boolean,
  justSignedOut: boolean
}

const App = () => {
  const [authFormSignup, setAuthFormSignup] = useState(false);
  const [appReady, setAppReady] = useState(false);

  const dispatch = useThunkDispatch();

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if(token) {
      setToken(token);
      dispatch(signinUser());
      setAppReady(true);
      console.log('headers set')
    } else {
      setAppReady(true);
    }
  },[])

  const handleAuthRouteChange = (route: string = '') => {
    if(!route) {
      setAuthFormSignup(prevState => !prevState)
      return;
    }

    if(route === 'signup')
      setAuthFormSignup(true);
    else
      setAuthFormSignup(false);
  }
  
  return (
    <div className="App">
        <Navigation handleAuthRouteChange={handleAuthRouteChange} />
        <Switch>
          <Route exact path='/' render={() => <AuthForm isSignup={authFormSignup} handleRouteChange={handleAuthRouteChange} />} />
          <Route exact path='/home' render={() => <ImageLinkForm />}/>
          <Route exact path='/profile/:id' render={() => <Profile appReady={appReady} />}/>
        </Switch>
    </div>
  )
}

/* class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      user: {} as IUser,
      authFormSignup: false,
      justSignedOut: false
    }
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if(token) {
      setToken(token);
    }
  }

  setJustSignedOut = (status: boolean): void => this.setState({justSignedOut: status});

  handleAuthRouteChange = (route: string = '') => {
    if(!route) {
      this.setState((prevState) => ({authFormSignup: !prevState.authFormSignup}));
      return;
    }

    if(route === 'signup')
      this.setState({authFormSignup: true});
    else
      this.setState({authFormSignup: false});
  }
  
  render() {
    const {user, authFormSignup, justSignedOut} = this.state;

    return (
      <div className="App">
        <Navigation handleAuthRouteChange={this.handleAuthRouteChange} setJustSignedOut={this.setJustSignedOut} />
        <Switch>
          <Route exact path='/' render={() => <AuthForm isSignup={authFormSignup} handleRouteChange={this.handleAuthRouteChange} justSignedOut={justSignedOut} setJustSignedOut={this.setJustSignedOut} />} />
          <Route exact path='/home' render={() => <ImageLinkForm />}/>
          <Route exact path='/profile/:id' render={() => <Profile />}/>
        </Switch>
      </div>
    );
  }
} */

export default App;
