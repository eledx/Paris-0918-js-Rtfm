import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';

class ArtistGetInfo extends Component {
	constructor(props){
		super(props);
		this.state = { 
			artists : null,
			concert : null
		};

	}

	requestUrlApi(){
		this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getInfo';
		this.artistName = 'manu chao';
		this.limit = '1';
		return `${this.apiBase}method=${this.method}&artist=${this.artistName}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
	}

	apiConcerts(){
		this.name = 'Nothing but Thieves';
		console.log(this.name);
		return `https://rest.bandsintown.com/artists/${this.name}/events?app_id=2a68c8b9f4bcbc7eecd0e2efdd7cac51&date=upcoming`;
	}

	componentDidMount(){
		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp =>  this.setState({artists : resp.artist}))
			.then(resp => console.log(this.state.artists.bio.summary))
		fetch(this.apiConcerts())
			.then(resp => resp.json())
			.then(resp => this.setState({concert : resp}))
			.then(resp => console.log(this.state.concert[0].venue.city))
	}

	render() {
		if (this.state.artists === null || this.state.concert === null){
			return (<LoadSpinner/>);
		}
		const regex = /<a.+a>/g;
		return (
			<div>
				<h3>{this.state.artists.name}</h3>
				<p>{this.state.artists.bio.summary.replace(regex, '')}</p>
				<img src={this.state.artists.image[3]["#text"]} alt="img" />
				<p>Next concert in {this.state.concert[0].venue.city}, {this.state.concert[0].venue.country}</p>
			</div>
		);
	}
}

export default ArtistGetInfo;