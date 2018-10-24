import React from 'react';

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

const FicheArtist = (props) => {
	return (
		<MuiThemeProvider theme={theme}>
			<Grid container justify='center' className="bgHome">
				<Grid item xs={8}>
					<Header />
					<ArtistConcerts artistName={props.match.params.name} />
					<ArtistBio artistName={props.match.params.name} />
					<Tracks artistName={props.match.params.name} />
				</Grid>
			</Grid>
		</MuiThemeProvider>
	)
}

export default FicheArtist;