import React, { Component } from 'react';


class ArtistGetInfo extends Component {
	constructor(props){
    	super(props);
		this.state = { 
			artists : null
		};

	}

	requestUrlApi(){
		this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getInfo';
		this.artistName = 'The Rolling Stones';
		this.limit = '1';
		return `${this.apiBase}method=${this.method}&artist=${this.artistName}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
	}

	componentDidMount(){
		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp =>  this.setState({artists : resp.artist}))
			.then(resp => console.log(this.state.artists.bio.summary))
		}

	render() {
		if (this.state.artists === null){
			return "loading";
		}
		return (
			<div>
				<h2>{this.state.artists.name}</h2>
				<p>{this.state.artists.bio.summary}</p>
				<img src={this.state.artists.image[2]["#text"]} alt="img"></img>
			</div>
		);
	}
}

export default ArtistGetInfo;