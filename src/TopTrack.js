import React, { Component } from 'react';


class TopTrack extends Component {
	constructor(props){
    	super(props);
    	this.state = { tracks : null };
  	}

	requestUrlApi(){
    	this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getTopTracks';
		this.artistName = 'The Kinks';
		this.limit = '5';
    	return `${this.apiBase}method=${this.method}&artist=${this.artistName}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
  	}

	componentDidMount(){
		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp => this.setState({tracks : resp.toptracks.track}))
	}

	render() {
        if(this.state.tracks === null){
            return "loading";
        }
		return (
			<div>
                <h2>{this.state.tracks[0].artist.name}</h2>
                <img src={this.state.tracks[0].image[3]['#text']} alt={this.state.tracks[0].artist.name} />
				{this.state.tracks.map(
					(element, i) => 
					<div key={i}>
						<h2>{element.name} - {element.artist.name}</h2>
					</div>
				)}
			</div>
		);
	}
}

export default TopTrack;