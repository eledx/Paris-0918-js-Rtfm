import React, { Component } from 'react';
import FicheArtist from './FicheArtist';
import LoadSpinner from './LoadSpinner';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';




	const theme = createMuiTheme ({
		palette : {
		primary :{main: "#604C8D"},
		
		},
		
		typography : {
		fontSize : 60,
		fontFamily: "Maiden"},
		
		})

class SimilarArtists extends Component {
	constructor(props){
    	super(props);
    	this.state = { 
			artists : null,
			artistInfo : null,
			renderFicheArtist : false,
			renderFicheArtistSimilar : false,
			index: 0,
			renderSimilarArtists: false
			};
		}

	requestUrlApi(artist){
    	this.apiBase = 'http://audioscrobbler.com/2.0/?';
		this.apiKey = 'af05581a38f69802ba020346115c8834';
		this.method = 'artist.getsimilar';
		this.limit = '3';
		return `${this.apiBase}method=${this.method}&artist=${artist}&limit=${this.limit}&api_key=${this.apiKey}&format=json`;
	}
	
	componentDidMount(){
		fetch(this.requestUrlApi(this.props.artistInput))
			.then(resp => resp.json())
			.then(resp => this.setState({artists : resp.similarartists.artist}))
		fetch(`http://audioscrobbler.com/2.0/?method=artist.getInfo&artist=${this.props.artistInput}&limit=1&api_key=af05581a38f69802ba020346115c8834&format=json`)
			.then(resp => resp.json())
			.then(resp => this.setState({artistInfo : resp.artist}))
	}

	handleClick = () => {
		this.setState({renderFicheArtist : true});
	}
	handleClickSimilar = () => {
		this.setState({renderFicheArtistSimilar : true})
	}

	handleClickSimilar = (e) => {
		this.setState({renderFicheArtistSimilar: true});
		this.setState({index: e.target.id});
	}

	handleClickListSimilar = (e) => {
		this.setState({renderSimilarArtists: true})
		this.setState({index : e.target.id})
	}

	render() {
        
		

		console.log('SimilarArtist.js', this.props.artistInput)
		if(this.state.artists === null || this.state.artistInfo === null)
			return <LoadSpinner/>;
		if(this.state.renderFicheArtist === true)
			return <FicheArtist artistName={this.state.artistInfo.name} />
		if(this.state.renderFicheArtistSimilar === true && this.state.index !== null)
			return <FicheArtist artistName={this.state.artists[this.state.index].name} />
		if(this.state.renderSimilarArtists === true && this.state.index !== null)
			return <SimilarArtists artistInput={this.state.artists[this.state.index].name} />

		return (
			
				<MuiThemeProvider theme={theme}>
				
				<Grid container justify="center">
					<Grid xs={8} container justify="center">
						<Grid  justify="center">
							<Typography><h2 onClick={this.handleClick}>{this.state.artistInfo.name}</h2></Typography>
						</Grid >
						<Grid container justify="center">
							<Avatar style={ {width:'200px',height:'200px'}} src={this.state.artistInfo.image[3]["#text"]} alt ="img" ></Avatar>
						</Grid>
						

						<Grid container justify="center">
						<Typography> Artists:</Typography>
						</Grid>
							
						<Grid container justify="space-between">
					
							{this.state.artists.map(
								(element, i) =>
									<div key={i}>
									<Grid container justify="center">
									<Typography><h3 onClick={this.handleClickSimilar} id={i}>{element.name}</h3></Typography>
									</Grid>
									<Grid container justify="center">
									<Avatar  style={{ width:'200px',height:'200px'}} src={element.image[3]["#text"]} alt="img" ></Avatar>
									</Grid>
									<Grid container justify="center">
									<MuiThemeProvider theme={theme}>
								<Button variant="contained" color="primary" onClick={this.handleClickListSimilar} id={i}><Typography>Push Me</Typography></Button >
								</MuiThemeProvider>
								</Grid>
								</div>
							)}
							</Grid>
							</Grid>
							</Grid>
						
							</MuiThemeProvider>
							)}}
	

export default  SimilarArtists;

