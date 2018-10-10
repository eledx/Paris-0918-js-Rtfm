import React, { Component } from 'react';
import FicheArtist from './FicheArtist';

class SimilarArtists extends Component {
	constructor(props){
    	super(props);
    	this.state = { 
			artists : null,
			artistInfo : null,
			renderFicheArtist : false
		};
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
		fetch(`http://audioscrobbler.com/2.0/?method=artist.getInfo&artist=${this.props.artistInput}&limit=1&api_key=af05581a38f69802ba020346115c8834&format=json`)
			.then(resp => resp.json())
			.then(resp => this.setState({artistInfo : resp.artist}))
	}

	handleClick = () => {
		this.setState({renderFicheArtist : true});
	}

	render() {
		console.log('SimilarArtist.js', this.props.artistInput)
		if(this.state.artists === null)
			return "loading"
		if(this.state.artistInfo === null)
			return "loading"
		if(this.state.renderFicheArtist === true)
			return <FicheArtist artistName={this.state.artistInfo.name} />

		return (
			<div>
				{/* {this.props.artistInput !== null && ( */}
					<div>
						<h2 onClick={this.handleClick}>{this.state.artistInfo.name}</h2>
						<img src={this.state.artistInfo.image[3]["#text"]} alt ="img" />
						{this.state.artists.map(
							(element, i) =>
								<div key={i}>
									<h3>{element.name}</h3>
									<img src={element.image[3]["#text"]} alt="img"></img>
								</div>
						)}
					</div>
				{/* )} */}
			</div>
		);
	}
}

export default SimilarArtists;