import React, { Component } from 'react';


class ListSimilarArtists extends Component {
	constructor(props){
    	super(props);
    	this.state = { artists : [] };
  	}

	requestUrlApi(){
    	this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getsimilar';
		this.artistName = '2 many dj';
		this.limit = '10';
    	return `${this.apiBase}method=${this.method}&artist=${this.artistName}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
  	}

	  componentDidMount(){
		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp => this.setState({artists : resp.similarartists.artist}))
	}

	

	render() {
		return (
			<div>
				{this.state.artists.map(
					(element, i) => 
					<div>
						<h2 key={i}>{element.name}</h2>
						<img src={element.image[4]['#text']} alt={element.name} />
					</div>
				)}
			</div>
		);
	}
}

export default ListSimilarArtists;