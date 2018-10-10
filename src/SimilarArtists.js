import React, { Component } from 'react';


class SimilarArtists extends Component {
	constructor(props){
    	super(props);
    	this.state = { artists : [] };
  	}

	requestUrlApi(artist){
    	this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getsimilar';
		this.limit = '5';
		return `${this.apiBase}method=${this.method}&artist=${artist}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
	}
	
	componentDidMount(){
		fetch(this.requestUrlApi(this.props.artistInput))
			.then(resp => resp.json())
			.then(resp => this.setState({artists : resp.similarartists.artist}))
	}

	render() {
		console.log('SimilarArtist.js', this.props.artistInput)
		return (
			<div>
				{this.props.artistInput !== null && (this.state.artists.map(
					(element, i) =>
						<div key={i}>
							<h2>{element.name}</h2>
							<img src={element.image[3]["#text"]} alt="img"></img>
						</div>
				))}
			</div>
		);
	}
}

export default SimilarArtists;