import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const stylesArtistConcert = withStyles => ({

});

class ArtistConcerts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			concert: null
		};
	}

	apiConcertsByName() {
		this.name = this.props.artistName;
		return `https://api.songkick.com/api/3.0/search/artists.json?apikey=u7XCPTAHztwOPCRa&query=${this.props.artistName}`;
	}

	apiConcertsWithId(id) {
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
		
		//console.log(this.state.concert)
		return (

			<Grid container justify="center">
				{this.state.concert.event.map(
					(element, index) =>
					
						<ul className='displayPostIt' key={index}>
							<li className={this.props.classes.li}>
								<span className={this.props.classes.spanConcert}>{element.displayName.replace('at', '-')}</span>
							</li>
							<li className={this.props.classes.li}>{element.location.city}</li>
							<li className={this.props.classes.li}><a className={this.props.classes.a} href={`https://www.google.fr/maps/dir/${element.venue.lat},${element.venue.lng}`} target="_blank" rel="noopener noreferrer">Plan</a></li>
						</ul>
					
				)}
			</Grid>
		)
	}
}

export default withStyles(stylesArtistConcert)(ArtistConcerts);
