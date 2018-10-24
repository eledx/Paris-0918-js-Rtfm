import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';

import { Grid, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#FFFFFF' },
		secondary: { main: '#FF0000' },
		background: { paper: '#604C8D' },
	},
	typography: {
		useNextVariants: true,
		fontSize: 24,
		fontFamily: 'Metal_Lord',
	},
});

class ArtistBio extends Component {
	state = {
		artists: null
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
				<Grid container className="artisteBio" alignItems="center">
					<Grid item xs={12} md={6} className="effectDiapo">
						<Grid container justify="center">
							<span href={this.state.artists.name} title={this.state.artists.name}>
								<img src={this.state.artists.image[3]["#text"]} alt={this.state.artists.name} title={this.state.artists.name} />
							</span>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6} className="rotateText">
						<Typography variant="body1" color="primary" align='justify'>{this.state.artists.bio.summary.replace(regex, '')}</Typography>
					</Grid>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

export default ArtistBio;