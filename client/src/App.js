import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import AppBar from './components/layout/AppBar';
import Home from './components/layout/Home';
import LogIn  from './components/auth/LogIn';
import Register from './components/auth/Register';
import Create from './components/layout/Create';

import { createStore, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { SET_CURRENT_USER } from './store/actions/types';
import { signOut } from './store/actions/authActions';

const middleware = [thunk];
const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //for chrome redux extension tool
);

//Check for token to authenticate
if(localStorage.jwtToken) {
    //Set auth token
    if(localStorage.jwtToken){
        axios.defaults.headers.common['Authorization'] = localStorage.jwtToken;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

    //Set Current user
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });

    //Check for expired token
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      //Logout user
      store.dispatch(signOut());
      // Redirect to login
      window.location.href = '/login';
    }
  }

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppBar/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={LogIn}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/create" component={Create}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
