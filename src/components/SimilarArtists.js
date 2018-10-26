import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/* Components */
import LoadSpinner from './LoadSpinner';
import Header from './Header';

/* Components Material UI */
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';



/*css*/
import "./SimilarArtists.css";

const styles = () => ({
	avatar: {
		width: 300,
		height:300,
		boxShadow: '0px 6px 0px 7px rgba(0, 0, 0, 0.5)',
	},
	avatarCard:{
		width: 200,
		height: 200,
		margin:15,
		boxShadow: '0px 3px 0px 5px rgba(0, 0, 0, 0.5)',
	},
	card:{
		margin: 36,
		fontSize: 20,
		maxWidht: 20,
		background:'linear-gradient(45deg, #860203 30%, #0f0202 90%)',
		borderRadius: 350,
		maxWidth:230,
		minWith: 230,
		boxShadow: '0px 5px 0px 7px rgba(0, 0, 0, 0.5)',
	},
	button:{
		background: 'linear-gradient(45deg,#490303 30%, #FF8E53 90%)',
		borderRadius: 60,
		color: 'white',
		height: 68,
		padding: '0 30px',
		marginBottom:36,
	},
	artistTitle1:{
		fontFamily: 'journal',
		fontSize:100,
		color:'white',
		textAlign:"center",
		textShadow: '5px 5px rgba(0,0,0, 1)',
	},
	artistTitle:{
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		WebkitBoxOrient:'vertical',
		
		fontFamily: 'journal',
		fontSize:50,
		color:'white',
		maxHeight:110,
		minHeight:110,
        textShadow: '5px 5px rgba(0,0,0, 1)',
		textAlign:"center",
		
	},
	artistTitle2:{
		fontFamily: 'journal',
		fontSize:50,
		color:'white',
		textShadow: '5px 5px rgba(0,0,0, 1)',
		textAlign:"center",
	}
	})

class SimilarArtists extends Component {

	state = {
		artists: null,  //Liste d'artistes similaires (image/nom)
		artistInfo: null, //info artiste recherché (image/nom)
		error: false  //gestion recherche improbable
	}

	requestUrlApi(artist) {
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
				//console.log("json", resp.similarartists)
				if (resp.similarartists !== undefined && !resp.error) {
					//console.log("no_error", resp.similarartists.artist)
					this.setState({ artists: resp.similarartists.artist })
				} else {
					//console.log("error")
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
	
	componentDidUpdate(prevProps) {
		//console.log("prev_props ", prevProps.match.params.name)
		//console.log("this_props", this.props.match.params.name);

		if (prevProps.match.params.name !== this.props.match.params.name) {
			this.getArtists()
		}	
	}

	render() {
		const { classes } = this.props; //material_ui

		if (this.state.artists === null || this.state.artistInfo === null) //attente des datas
			if (this.state.error === true) //pas de data car recherche improbable 
				return <Redirect to={"/404"}/>
			else
				return <LoadSpinner />
		return (
			<Grid container justify='center' alignItems='center' className="bgHome">
				<Header />
				<Grid item xs={8} >
					<Grid container justify='center' alignItems='center'   >
						<Grid container justify='center' alignItems='center' direction="column" >
							<Grid item>
								<Link to={`/fiche-artist/${this.state.artistInfo.name}`} style={{textDecoration:'none'}}>
									<Avatar src={this.state.artistInfo.image[3]["#text"]} alt={this.state.artistInfo.name} className={classes.avatar}></Avatar>
								</Link>
							</Grid>
							<Grid item>
								<Link to={`/fiche-artist/${this.state.artistInfo.name}`} style={{textDecoration:'none'}}>
									<h2 className={classes.artistTitle1}>{this.state.artistInfo.name}</h2>
								</Link>
							</Grid>
							<h2 className={classes.artistTitle2}>Wanna C some more, dude ?</h2>
						</Grid>
						{this.state.artists.map(
							(element, i) =>
							<div key={i}>
								<Card className={classes.card}>
									<Grid container alignItems='center' direction="column">
										<Link to={`/fiche-artist/${element.name}`} style={{textDecoration:'none'}}>
											<CardActionArea>
												<Avatar src={element.image[3]["#text"]} alt={element.name} className={classes.avatarCard} ></Avatar>
												<CardContent>
													<h2 id={i} className={classes.artistTitle} >{element.name}</h2>
												</CardContent>
											</CardActionArea>
										</Link>
										<CardActions >
											<Link to={`/similar-artist/${element.name}`}>
												<Button variant="contained" color="primary" className={classes.button}>
													<AddIcon />
												</Button >
											</Link>
										</CardActions>
									</Grid>
								</Card>
							</div>
						)}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(SimilarArtists);