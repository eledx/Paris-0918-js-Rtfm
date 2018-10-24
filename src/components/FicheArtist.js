import React, { Component } from 'react';

/* Components */
import ArtistBio from './ArtistBio';
import ArtistConcerts from './ArtistConcerts';
import Tracks from './Tracks';
import Header from './Header';

/* CSS */ 
import './FicheArtist.css';

/* Components Material UI */
import { Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
	palette: {
		primary: { main: '#ffffff' },
		secondary: { main: '#B32525' },
	},
});

/*a tester en fonction (composant bete)*/
class FicheArtist extends Component {

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Grid container justify='center' className="bgHome">
					<Grid item xs={8}>
						<Header />
						<ArtistConcerts artistName={this.props.match.params.name} />
						<ArtistBio artistName={this.props.match.params.name} />
						<Tracks artistName={this.props.match.params.name} />
					</Grid>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

export default FicheArtist;