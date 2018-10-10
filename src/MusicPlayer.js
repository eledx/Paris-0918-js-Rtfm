import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';

class MusicPlayer extends Component {
	constructor(props){
    	super(props);
    	this.state = { tracks : null };
  	}

	requestUrlApi(){
		this.proxy = `https://6fd6ffbe.ngrok.io`;
		this.artistName = 'Disturbed';
		this.limit = '10';
    	return `${this.proxy}/search?q=${this.artistName}&limit=${this.limit}&output=json`;
  	}

	  componentDidMount(){
		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp => this.setState({tracks : resp.data}))
			.then(resp => console.log(this.state.tracks))
	}

	render() {
		console.log(this.state);
        if(this.state.tracks === null){
            return (<LoadSpinner/>);
        }
		return (
			<div>
				<h2>Morceaux</h2>
				{this.state.tracks.map(
					(element, i) =>
						<div key={i}>
							<h3>{element.title}, {element.artist.name}</h3>
							<audio controls="controls">
							<source src={element.preview} type="audio/mp3" />
							`Votre navigateur n'est pas compatible`
							</audio>
							<img src={element.album.cover_medium} alt={element.artist.name} />
						</div>
				)}
			</div>
		);
	}
}

export default MusicPlayer;