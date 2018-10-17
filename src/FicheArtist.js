import React, { Component } from 'react';
import ArtistBio from './ArtistBio';
import ArtistConcerts from './ArtistConcerts';
import Tracks from './Tracks';
import Header from './Header';
import Footer from './Footer';
import './FicheArtist.css';

import { Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
	palette: {
		primary: { main: '#ffffff' },
		secondary: { main: '#B32525' },
	},
});

class FicheArtist extends Component {

	render() {
		//console.log("ficheArtist.js", this.props.artistName)
		return (
			<MuiThemeProvider theme={theme}>
				<Grid container justify='center' className="backgroundDisc">
					<Grid item xs={8} justify='center'>
						<Header />
						<ArtistConcerts artistName={this.props.artistName} />
						<ArtistBio artistName={this.props.artistName} />
						<Tracks artistName={this.props.artistName} />
						<Footer />
					</Grid>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

export default FicheArtist;