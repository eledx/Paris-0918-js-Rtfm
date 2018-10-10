import React, { Component } from 'react';


class ArtistConcerts extends Component {
	constructor(props){
		super(props);
		this.state = { 
			concert : null
		};
	}

	apiConcerts(){
		this.name = 'Nothing but Thieves';
		console.log(this.name);
		return `https://rest.bandsintown.com/artists/${this.name}/events?app_id=2a68c8b9f4bcbc7eecd0e2efdd7cac51&date=upcoming`;
	}

	componentDidMount(){
		fetch(this.apiConcerts())
			.then(resp => resp.json())
			.then(resp => this.setState({concert : resp}))
			.then(resp => console.log(this.state.concert[0].venue.city))
	}

	render(){
		if (this.state.concert === null){
			return "loading";
		}
		console.log("artistConcerts",this.props.artistName)
		return(
			<div>
				<p>Next concert in {this.state.concert[0].venue.city}, {this.state.concert[0].venue.country}</p>
			</div>
		)
	}
}

export default ArtistConcerts;