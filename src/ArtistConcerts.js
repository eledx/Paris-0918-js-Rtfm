import React, { Component } from 'react';


class ArtistConcerts extends Component {
	constructor(props){
		super(props);
		this.state = { 
			concert : []
		};
	}

	apiConcerts(){
		this.name = this.props.artistName;
		console.log(this.name);
		return `https://rest.bandsintown.com/artists/${this.name}/events?app_id=2a68c8b9f4bcbc7eecd0e2efdd7cac51&date=upcoming`;
	}

	componentDidMount(){
		fetch(this.apiConcerts())
			.then(resp => resp.json())
			.then(resp => this.setState({concert : resp}))
	}

	render()
		{console.log("artistConcerts",this.props.artistName)
		if (this.state.concert.length === 0){
			return "loading..";
		}
		return(
			<div>
				<p>Next concert in {this.state.concert[0].venue.city}, {this.state.concert[0].venue.country}</p>
			</div>
		)
	}
}

export default ArtistConcerts;