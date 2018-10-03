import React, { Component } from 'react';
import logo from './logo.svg';
import ListSimilarArtists from './ListSimilarArtists';
import './App.css';
import ListSimilarArtists from './ListSimilarArtists';
import ArtistGetInfo from './ArtistGetInfo';

class App extends Component {

  render() {
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
          <ListSimilarArtists />
          <ArtistGetInfo />
        </header>
      </div>
    );
  }
}

export default App;
