import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';
import MusicPlayer from 'react-responsive-music-player'

class Tracks extends Component {
	constructor(props){
    	super(props);
    	this.state = { tracks : null};
  	}

	requestUrlApi(){
		this.proxy = `https://5e289275.ngrok.io`;
		this.artistName = this.props.artistName;
		this.limit = '10';
    	return `${this.proxy}/search?q=${this.artistName}&limit=${this.limit}&output=json`;
  	}

	componentDidMount(){

		fetch(this.requestUrlApi())
			.then(resp => resp.json())
			.then(resp => this.setState({tracks : resp.data}))
	}

	render() {
        let playlist = [];

        if(this.state.tracks === null){
            return (<LoadSpinner/>);
        }
        playlist = this.state.tracks.map((e)=>{
        	return {
        		url: e.preview, 
        		cover: e.album.cover_medium, 
        		title: e.title, 
        		artist: [e.artist.name]
        	}
        });

		return (
			<div>
				<h2>Morceaux</h2>
				<MusicPlayer playlist={playlist} />
			</div>
		);
	}
}

export default Tracks;