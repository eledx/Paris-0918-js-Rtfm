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
		return `https://api.songkick.com/api/3.0/artists/${id}/calendar.json?apikey=u7XCPTAHztwOPCRa`;
	}

	componentDidMount(){
		fetch(this.apiConcertsByName())
			.then(resp => resp.json())
			.then(resp => {
				const id = resp.resultsPage.results.artist[0].id;
				this.setState({id});
				fetch(this.apiConcertsWithId(id))
				.then(resp => resp.json())
				.then(resp => this.setState({concert : resp.resultsPage}))
				.then(resp => console.log("2e fetch",this.state.concert.results.event[0].displayName))
			});
			//.then(resp => console.log("1er fetch",this.state.id))
			
	}

	render() {
		if(this.state.concert === null){
			return "loading...";
		}
		// if(this.state.id === null){
		// 	return "loading...";
		// }
		return(
			<div>
				<p>Next concert : {this.state.concert.results.event[0].displayName}</p>
			</div>
		)
	}
}

export default ArtistConcerts;