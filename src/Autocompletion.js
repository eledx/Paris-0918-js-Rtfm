import React, { Component } from 'react';


class Autocompletion extends Component {

  constructor() {
    super()
    this.state = {
      search: '',
      finalSearch: '',
      suggestions: [],
    }
  }

  updateSearch(event) {
    event.preventDefault()
    this.setState({search: event.target.value})
    this.requestAutocompletion(event.target.value)
  }

  requestAutocompletion(artist){
    fetch(`http://audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&limit=5&api_key=af05581a38f69802ba020346115c8834&format=json`)
    .then(resp => resp.json())
    .then(resp => this.setState({suggestions : resp.results.artistmatches.artist}))
    }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({finalSearch: event.target[0].value})
    console.log('YO')
    console.log(this)
    this.props.method.requestSimilarArtist(this.state.finalSearch)
  }

  handleSuggestionClick(event) {
    event.preventDefault()
    this.setState({finalSearch: event.target.innerText})
    console.log('YO')
    console.log(this.state)
    this.props.method.requestSimilarArtist(this.state.finalSearch)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Votre artiste"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}/>
          <button>Search</button>
          {/* <p> Vous avez tapé : {this.state.search}</p>
          <p> recherce finale: {this.state.finaleSearch}</p> */}
          <div>
        {this.state.suggestions.map(
          (element, i) => <p key={i} onClick={this.handleSuggestionClick.bind(this)}>{element.name}</p>
        )}
          </div>
        </form>
      </div>
    );
  }
}

export default Autocompletion;


