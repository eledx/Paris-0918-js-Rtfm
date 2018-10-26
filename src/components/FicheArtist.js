import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

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

class FicheArtist extends Component{
	state = {
		errorBio: false, //gestion error biographie
		errorConcert: false, //gestion error concert
	}
	
	handleErrorBio = () => {
		this.setState({errorBio: true})
	}
	handleErrorConcert= () => {
		this.setState({errorConcert: true})
	}
	
	render() {
		console.log("tut" , this.state)
		if(this.state.errorBio && this.state.errorConcert){
			return	<Redirect to={`/404`}/>
		}
		return (
			<MuiThemeProvider theme={theme}>
				<Grid container justify='center' className="bgHome">
					<Grid item xs={8}>
						<Header />
						<ArtistConcerts artistName={this.props.match.params.name} error={this.handleErrorConcert} stateError={this.state.errorConcert} />
						<ArtistBio artistName={this.props.match.params.name} error={this.handleErrorBio} stateError={this.state.errorBio} />
						<Tracks artistName={this.props.match.params.name} />
					</Grid>
				</Grid>
			</MuiThemeProvider>
		)
	}
}

export default FicheArtist;