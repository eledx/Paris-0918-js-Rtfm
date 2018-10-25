import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const stylesArtistConcert = withStyles => ({

});

class ArtistConcerts extends Component {
	state = {
		id: null, //id de l'artiste
		concert: null // concert de l'artiste
	}

	apiConcertsByName() {
		this.name = this.props.artistName;
		return `https://api.songkick.com/api/3.0/search/artists.json?apikey=u7XCPTAHztwOPCRa&query=${this.props.artistName}`;
	}

	apiConcertsWithId(id) { //976593
		return `https://api.songkick.com/api/3.0/artists/${id}/calendar.json?apikey=u7XCPTAHztwOPCRa&per_page=3`;
	}

	componentDidMount() {
		fetch(this.apiConcertsByName())
			.then(resp => resp.json())
			.then(resp => {
				if (Object.getOwnPropertyNames(resp.resultsPage.results).length !== 0) {
					const id = resp.resultsPage.results.artist[0].id;
					this.setState({ id });
					fetch(this.apiConcertsWithId(id))
						.then(resp => resp.json())
						.then(resp => this.setState({ concert: resp.resultsPage.results }))
				}
			});
	}

	render() {
		if (this.state.concert === null)
			return <LoadSpinner />;
		if (Object.getOwnPropertyNames(this.state.concert).length === 0) {
			return "No upcoming concerts";
		}
		//Utilisation de la librairie moment.js pour manipuler les Dates.. TOP LIBRARY npm install moment
		let moment = require('moment');
		//console.log(this.state.concert)
		return (

			<Grid container justify="center" className="artistConcert">
				{this.state.concert.event.map(
					(element, index) =>
						<ul className='displayPostIt' key={index}>
							<li className={this.props.classes.li}>{moment(element.start.date).format('MMMM Do YYYY')}
								{/*ternaire*/}
								{element.start.datetime !== null ? ' - ' + moment(element.start.datetime).format('h:mm') : ''}
							</li>
							<li>{this.props.artistName}</li>
							<li className={this.props.classes.li}>{element.venue.displayName}</li>
							<li className={this.props.classes.li}> {element.location.city.replace(", ", " - ")}</li>
							<li className={this.props.classes.li}><a className={this.props.classes.a} href={`https://www.google.fr/maps/dir/${element.venue.lat},${element.venue.lng}`} target="_blank" rel="noopener noreferrer">Plan</a></li>
						</ul>
				)}
			</Grid>
		)
	}
}

export default withStyles(stylesArtistConcert)(ArtistConcerts);
