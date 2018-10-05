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

		this.artistName = 'The Kinks';
		this.limit = '3';
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
						<div key={i}>
							<h2>{element.name}</h2>
							<p>{element.image[3].size}</p>
							<img src={element.image[3]["#text"]} alt="img"></img>
						</div>
				)}
			</div>
		);
	}
}

export default ListSimilarArtists;