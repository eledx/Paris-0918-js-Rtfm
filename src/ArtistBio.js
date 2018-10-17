import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';

import { Grid, Typography } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#FFFFFF' },
		secondary: { main: '#B32525' },
		background: { paper: '#000000' },
	},
	typography: {
		useNextVariants: true,
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


		var myClassNammes = 'gallery diapositive';


		//console.log("artistBio",this.props.artistName)
		return (

			/* Mettre u box shadow a l'image box-shadow: 8px 8px 0px #c5c5c5; */
			<MuiThemeProvider theme={theme}>
				<Grid container>
					<Grid item xs={4} className={myClassNammes}>
						<a href={this.state.artists.name} title={this.state.artists.name}>
							<img src={this.state.artists.image[3]["#text"]} alt={this.state.artists.name} title={this.state.artists.name} />
						</a>
					</Grid>
					<Grid item xs={8}>
						<Typography variant="body1" color="primary">{this.state.artists.bio.summary.replace(regex, '')}</Typography>
					</Grid>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

export default ArtistBio;