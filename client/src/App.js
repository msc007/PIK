import React, { Component } from 'react';
import './App.css';
import AppBar from './components/layout/AppBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home';
import LogIn  from './components/auth/LogIn';
import Register from './components/auth/Register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar/>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={LogIn}/>
            <Route exact path="/register" component={Register}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
