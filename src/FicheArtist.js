import React, { Component } from 'react';
import ArtistBio from './ArtistBio';
import ArtistConcerts from './ArtistConcerts';
import Tracks from './Tracks';

class FicheArtist extends Component {

	render(){
		console.log("ficheArtist.js", this.props.artistName)
		return(
			<div>
				<ArtistBio artistName={this.props.artistName} />
				<h3>Upcoming Concerts</h3>
				<ArtistConcerts artistName={this.props.artistName} />
				<h3>Some Tracks</h3>
				<Tracks artistName={this.props.artistName} />
			</div>
		)
	}
}

export default FicheArtist;