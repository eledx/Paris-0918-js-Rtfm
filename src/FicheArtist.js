import React, { Component } from 'react';
import ArtistBio from './ArtistBio';
import ArtistConcerts from './ArtistConcerts';
import MusicPlayer from './MusicPlayer';


class FicheArtist extends Component {

	render(){
		console.log("ficheArtist.js", this.props.artistName)
		return(
			<div>
				<ArtistBio artistName={this.props.artistName}/>
				<ArtistConcerts artistName={this.props.artistName}/>
				<MusicPlayer artistName={this.props.artistName}/>
			</div>
		)
	}
}

export default FicheArtist;