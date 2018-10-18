import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';

import { Grid, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#000000' },
		secondary: { main: '#FF0000' },
		background: { paper: '#000000' },
	},
	typography: {
		useNextVariants: true,
		fontSize: 35,
		fontFamily: 'textTrash',
	},
});

class ArtistBio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artists: null
		};

	}
	requestUrlApi() {
		this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getInfo';
		this.artistName = this.props.artistName;
		this.limit = '1';
		return `${this.apiBase}method=${this.method}&artist=${this.artistName}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
	}

	componentDidMount() {
		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp => this.setState({ artists: resp.artist }))
	}
	render() {
		if (this.state.artists === null) {
			return <LoadSpinner />;
		}
		const regex = /<a.+a>/g;

		//console.log("artistBio",this.props.artistName)
		return (
			
			<MuiThemeProvider theme={theme}>
				<Grid container className="artisteBio" alignItems="center" justify="center">
					<Grid item xs={12} md={6} className="gallery">
						<span href={this.state.artists.name} title={this.state.artists.name}>
							<img src={this.state.artists.image[3]["#text"]} alt={this.state.artists.name} title={this.state.artists.name} />
						</span>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography variant="body1" color="secondary" align='justify' className="rotateText">{this.state.artists.bio.summary.replace(regex, '')}</Typography>
					</Grid>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

export default ArtistBio;