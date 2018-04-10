import React, { Component } from 'react';
import './App.css';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Choose your avatar</h1>
          <img src={images[0]} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
