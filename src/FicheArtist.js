import React, { Component } from 'react';
import ArtistBio from './ArtistBio';
import ArtistConcerts from './ArtistConcerts';
import Tracks from './Tracks';

class FicheArtist extends Component {

	render(){
		console.log("ficheArtist.js", this.props.artistName)
		return(
			<div>
				<h2>Biography</h2>
				<ArtistBio artistName={this.props.artistName} />
				<h2>Upcoming Concerts</h2>
				<ArtistConcerts artistName={this.props.artistName} />
				<h2>Some Tracks</h2>
				<Tracks artistName={this.props.artistName} />
			</div>
		)
	}
}

export default FicheArtist;