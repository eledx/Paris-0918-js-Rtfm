import React, { Component } from 'react';
import Header from './Header'
import Body from './Body'
import Footer from './Footer';
import './App.css';


class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;



















































/*import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom';
import ListSimilarArtists from './ListSimilarArtists';
import ArtistGetInfo from './ArtistGetInfo';
import TopTrack from './TopTrack';
import MusicPlayer from './MusicPlayer'
import Autocompletion from './Autocompletion';*/

/*</div>
<BrowserRouter>
        <div className="App">
          <header className="App-header">
            <NavLink exact className="navbarlink" to="/listsimilarartists"> ListSimilarArtists </NavLink>
            <NavLink className="navbarlink" to="/artistgetinfo"> ArtistGetInfo </NavLink>
            <NavLink className="navbarlink" to="/toptrack"> TopTrack </NavLink>
            <NavLink className="navbarlink" to="/musicplayer"> MusicPlayer </NavLink>
            <NavLink className="navbarlink" to="/autocompletion"> SearchBar </NavLink>
            <Switch>
                <Route exact path="/listsimilarartists" component={ListSimilarArtists} />
                <Route path="/artistgetinfo" component={ArtistGetInfo} />
                <Route path="/toptrack" component={TopTrack} />
                <Route path="/musicplayer" component={MusicPlayer} />
                <Route path="/autocompletion" component={Autocompletion} />
            </Switch>
          </header>
        </div>
      </BrowserRouter>*/