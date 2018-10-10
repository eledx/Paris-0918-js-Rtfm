import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, NavLink } from 'react-router-dom';
import SimilarArtists from './SimilarArtists';
import ArtistGetInfo from './ArtistGetInfo';
import TopTrack from './TopTrack';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      userInput: '',
      finalSearch: null,
      suggestions: []
    }
  }

  // Afficher nom d'artiste dans searchBar & appeler l'autocomplétion
  searchBarDisplay = (event) => {
    this.setState({userInput: event.target.value})
    this.requestAutocompletion(event.target.value)
  }

  //  Appel de l'API : méthode d'autocomplétion
  requestAutocompletion = (artist) => {
    fetch(`http://audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&limit=5&api_key=af05581a38f69802ba020346115c8834&format=json`)
    .then(resp => resp.json())
    .then(resp => this.setState({suggestions : resp.results.artistmatches.artist}))
    }

  // Instructions à exécuter sur le clic du bouton submit
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({finalSearch: event.target[0].value})
    this.setState({userInput: event.target[0].value})
    console.log('submit', this.state)
  }

  // Instructions à exécuter sur le clic d'un nom d'artiste
  handleArtistClick = (event) => {
    this.setState({finalSearch: event.target.innerText})
    this.setState({userInput: event.target.innerText})
    console.log('artistClick' , this.state)
  }

  render() {
    if(this.state.finalSearch !== null){
      return <SimilarArtists artistInput={this.state.finalSearch} />
    }
    return (
      <BrowserRouter>
        <div className="App">
            <header className="App-header">
            <form onSubmit={this.handleSubmit}>
              <input 
              type="text" 
              placeholder="Votre artiste"
              value={this.state.userInput}
              onChange={this.searchBarDisplay}/>
              <button>Search</button>
            </form>
            <div>
            {this.state.suggestions.map(
              (element, i) => <p key={i} onClick={this.handleArtistClick}>{element.name}</p>
            )}
              </div>
            <NavLink className="navbarlink" to="/artistgetinfo"> ArtistGetInfo </NavLink>
            <NavLink className="navbarlink" to="/toptrack"> TopTrack </NavLink>
            <Switch>
                <Route path="/similarartists" component={SimilarArtists} />
                <Route path="/artistgetinfo" component={ArtistGetInfo} />
                <Route path="/toptrack" component={TopTrack} />
            </Switch>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
