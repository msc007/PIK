import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Button color="danger">THIS IS button</Button>
      <h1>My React App</h1>
      </div>
    );
  }
}

export default App;
