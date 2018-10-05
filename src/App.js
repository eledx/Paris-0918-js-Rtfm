import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom';
import ListSimilarArtists from './ListSimilarArtists';
import ArtistGetInfo from './ArtistGetInfo';
import TopTrack from './TopTrack';
import Autocompletion from './Autocompletion';
import './App.css';

class App extends Component {

  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <h1>TopTrack</h1>
      //     <TopTrack />
      //     <h1>ListSimilarArtists</h1>
      //     <ListSimilarArtists />
      //     <h1>ArtistGetInfo</h1>
      //     <ArtistGetInfo />
      //   </header>
      // </div>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <NavLink exact className="navbarlink" to="/listsimilarartists"> ListSimilarArtists </NavLink>
            <NavLink className="navbarlink" to="/artistgetinfo"> ArtistGetInfo </NavLink>
            <NavLink className="navbarlink" to="/toptrack"> TopTrack </NavLink>
            <NavLink className="navbarlink" to="/autocompletion"> SearchBar </NavLink>
            <Switch>
                <Route exact path="/listsimilarartists" component={ListSimilarArtists} />
                <Route path="/artistgetinfo" component={ArtistGetInfo} />
                <Route path="/toptrack" component={TopTrack} />
                <Route path="/autocompletion" component={Autocompletion} />
            </Switch>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
