import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';

class ArtistConcerts extends Component {
	constructor(props){
		super(props);
		this.state = { 
			id : null,
			concert : null
		};
	}

	apiConcertsByName(){
		this.name = this.props.artistName;
		return `https://api.songkick.com/api/3.0/search/artists.json?apikey=u7XCPTAHztwOPCRa&query=${this.props.artistName}`;
	}

	apiConcertsWithId(id){
		return `https://api.songkick.com/api/3.0/artists/${id}/calendar.json?apikey=u7XCPTAHztwOPCRa&per_page=3`;

	}

	componentDidMount(){
		fetch(this.apiConcertsByName())
			.then(resp => resp.json())
			.then(resp => {
				const id = resp.resultsPage.results.artist[0].id;
				this.setState({id});
				fetch(this.apiConcertsWithId(id))
				.then(resp => resp.json())
				.then(resp => this.setState({concert : resp.resultsPage.results}))
			});
	}

	render() {
		if(this.state.concert === null)
			return <LoadSpinner/>;
		if(Object.getOwnPropertyNames(this.state.concert).length === 0){
			return "No upcoming concerts";
		}

		console.log(this.state.concert)
		return(
			<div>
				{this.state.concert.event.map(
					(element, index) =>
						<div>
						<p key={index}>
						Next concert : {element.displayName} at {element.location.city}</p>
						<a href={`https://www.google.fr/maps/dir/${element.venue.lat},${element.venue.lng}`} target="_blank">GOOGLE MAP</a>
						</div>
				)}
			</div>
		)

	}
}

export default ArtistConcerts;