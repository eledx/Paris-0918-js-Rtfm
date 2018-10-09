import React, { Component } from 'react';


class Autocompletion extends Component {

  constructor() {
    super()
    this.state = {
      userInput: '',
      finalSearch: '',
      suggestions: [],
      similarArtists: []
    }
  }

  updateSearch = (event) => {
    this.setState({userInput: event.target.value})
    this.requestAutocompletion(event.target.value)
  }

  requestAutocompletion = (artist) => {
    fetch(`http://audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&limit=5&api_key=af05581a38f69802ba020346115c8834&format=json`)
    .then(resp => resp.json())
    .then(resp => this.setState({suggestions : resp.results.artistmatches.artist}))
    }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({finalSearch: event.target[0].value})
    // this.setState({userInput: event.target[0].value})
    console.log(this.state)
    this.requestSimilarArtist(this.state.finalSearch)
  }

  handleArtistClick = (event) => {
    this.setState({finalSearch: event.target.innerText})
    // this.setState({userInput: event.target.innerText})
    console.log('artisClick' , this.state)
    this.requestSimilarArtist(this.state.finalSearch)
  }

  requestSimilarArtist = (artist) =>{
    console.log('similar: ', artist)
    fetch(`http://audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&limit=10&api_key=af05581a38f69802ba020346115c8834&format=json`)
      .then(resp => resp.json())
      .then(resp => this.setState({similarArtists : resp.similarartists.artist}))
    }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
          type="text" 
          placeholder="Votre artiste"
          value={this.state.userInput}
          onChange={this.updateSearch}/>
          <button>Search</button>
        </form>
        <div>
        {this.state.suggestions.map(
          (element, i) => <p key={i} onClick={this.handleArtistClick}>{element.name}</p>
        )}
          </div>
          <div>
        {this.state.similarArtists.map((element, i) => <h2 key={i} onClick={this.handleArtistClick}>{element.name}</h2>)}
        </div>
      </div>
    );
  }
}

export default Autocompletion;

