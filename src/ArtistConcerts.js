import React, { Component } from 'react';


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
			return "loading...";
		if(Object.getOwnPropertyNames(this.state.concert).length === 0){
			return "no concerts";
		}
		return(
			<div>
				{this.state.concert.event.map(
					(element, index) =>
						<p key={index}>Next concert : {element.displayName}</p>
				)}
			</div>
		)

	}
}

export default ArtistConcerts;