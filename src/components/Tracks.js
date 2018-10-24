import React, { Component } from 'react';

/* Components */
import LoadSpinner from './LoadSpinner';
import MusicPlayer from 'react-responsive-music-player';

/* Components Material UI */
import { Grid } from '@material-ui/core';

class Tracks extends Component {
	state = { 
		tracks: null
	}

	requestUrlApi() {
		this.proxy = `http://097f82b4.ngrok.io`;
		this.artistName = this.props.artistName;
		this.limit = '10';
		return `${this.proxy}/search?q=${this.artistName}&limit=${this.limit}&output=json`;
	}

	componentDidMount() {
		//console.log("tracks" , this.requestUrlApi() )
		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp => this.setState({ tracks: resp.data }))
	}

	render() {
		let playlist = [];

		if (this.state.tracks === null) {
			return (<LoadSpinner />);
		}
		//console.log("tracks", this.state.tracks)
		
		this.state.tracks.filter((e) => {
			//console.log("name", this.props.artistName)
			if (e.artist.name.includes(this.props.artistName)) {
				playlist.push({
					url: e.preview,
					cover: e.album.cover_medium,
					title: e.title,
					artist: [e.artist.name]
				})
			}
			return playlist;
		});
		//console.log("playlist", playlist)
		if (playlist.length === 0)
			return `Sorry, we haven't any tracks from ${this.props.artistName}`

		return (
			<Grid container justify="center" className="containerMusicPlayer">
				<MusicPlayer playlist={playlist} />
			</Grid>
		);
	}
}

export default Tracks;