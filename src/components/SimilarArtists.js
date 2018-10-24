import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
		
		fontFamily: 'journal',
		fontSize:50,
		color:'white',
		maxHeight:80,
		minHeight:80,
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
		const { classes } = this.props;
		if (this.state.artists === null || this.state.artistInfo === null)
			if (this.state.error === true)
				return <p style={{ color: 'white' }}>If you see this, 1) pls pick an artist, 2) your internet connection sucks !</p>
			else
				return <LoadSpinner />
		return (
			
				<Grid container justify='center' alignItems='center' className="bgHome">
				    <Header />
						<Grid item xs={8} >
							<Grid container justify='center' alignItems='center'   >
								<Grid container justify='center' alignItems='center' direction="column" >
									<Grid item>
										<Avatar src={this.state.artistInfo.image[3]["#text"]} alt="img" className={classes.avatar}></Avatar>
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
											<CardActionArea>
												<Avatar src={element.image[3]["#text"]} alt="img" className={classes.avatarCard} ></Avatar>
													<CardContent >
														<Link to={`/fiche-artist/${element.name}`} style={{textDecoration:'none'}}>
															<h2 id={i} className={classes.artistTitle} >{element.name}</h2>
														</Link>
													</CardContent>
											</CardActionArea>
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