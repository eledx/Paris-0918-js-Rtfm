import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* Components */
import LoadSpinner from './LoadSpinner';
import Header from './Header';

/* Components Material UI */
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	pictures: {
		width: 250,
		height: 250,
	},
	artists: {
		fontSize : 30,
		fontFamily: "maiden",
		marginTop: 50,
		marginBottom: 50,
		width: '100%',
		maxWidth: 500,
	}
}


class SimilarArtists extends Component {

	constructor(props) {
		super(props);
		this.state = {
			artists: null,
			artistInfo: null,
			renderFicheArtist: false,
			renderFicheArtistSimilar: false,
			index: 0,
			renderSimilarArtists: false,
			error: false
		};
	}

	requestUrlApi(artist = "") {
		this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getsimilar';
		this.limit = '4';
		return `${this.apiBase}method=${this.method}&artist=${artist}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
	}

	getArtists() {
		fetch(this.requestUrlApi(this.props.match.params.name))
			.then(resp => resp.json())
			.then(resp => {
				console.log("json", resp.similarartists)
				if (resp.similarartists !== undefined && !resp.error) {
					console.log("no_error", resp.similarartists.artist)
					this.setState({ artists: resp.similarartists.artist })
				} else {
					console.log("error")
					this.setState({ error: true })
				}
			})
		fetch(`http://audioscrobbler.com/2.0/?method=artist.getInfo&artist=${this.props.match.params.name}&limit=1&api_key=af05581a38f69802ba020346115c8834&format=json`)
			.then(resp => resp.json())
			.then(resp => this.setState({ artistInfo: resp.artist }))
	}
	componentDidMount() {
		this.getArtists()
	}
	componentDidUpdate(nextProps) {
		console.log("next_props ", nextProps.match.params.name)
		console.log("this_props", this.props.match.params.name);

		if (nextProps.match.params.name !== this.props.match.params.name) {
			this.getArtists()
		}
	}

	render() {

		if (this.state.artists === null || this.state.artistInfo === null)
			if (this.state.error === true)
				return <p style={{ color: 'white' }}>If you see this, 1) pls pick an artist, 2) your internet connection sucks !</p>
			else
				return <LoadSpinner />
		return (
			
			<Grid container justify="center" >
			<Grid item xs container sm={8} >
				
				<Grid container justify="center">
				<Grid item>
					<Typography color="primary" onClick={this.handleClick} className={classes.artists}>{this.state.artistInfo.name}</Typography>
					<Avatar src={this.state.artistInfo.image[3]["#text"]} alt ="img" className={classes.pictures}></Avatar>
				</Grid>
				</Grid>
				
				<Grid container justify="center">
				<Grid item>
					<Typography color="secondary" className={classes.artists}> Artists:</Typography>
				</Grid>
				</Grid>
				
				
				<Grid container justify="space-between">

					{this.state.artists.map(
						(element, i) =>
							<div key={i}>
									<Grid item xs>
									<Typography onClick={this.handleClickSimilar} id={i}>{element.name}</Typography>
									</Grid>
									<Grid item xs>
									<Avatar src={element.image[3]["#text"]} alt="img" className={classes.pictures} ></Avatar>
									</Grid>
									<Grid item xs>
									<Button variant="contained" color="primary" onClick={this.handleClickListSimilar} id={i}><Typography>Push Me</Typography></Button >
								</Grid>
								
							</div>
					)}</Grid>
				
			</Grid>
		</Grid>
		);
	}
}

export default withStyles(styles)(SimilarArtists);