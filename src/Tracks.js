import React, { Component } from 'react';
import LoadSpinner from './LoadSpinner';
import MusicPlayer from 'react-responsive-music-player'

class Tracks extends Component {
	constructor(props){
    	super(props);
    	this.state = { tracks : null};
  	}

	requestUrlApi(){
		this.proxy = `https://a79f47ab.ngrok.io`;
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
        this.state.tracks.filter((e)=>{
	        if(e.artist.name.includes(this.props.artistName)) {
	        	playlist.push({
	        		url: e.preview, 
	        		cover: e.album.cover_medium, 
	        		title: e.title, 
	        		artist: [e.artist.name]
        		})
	        }	
	        return playlist;
        });

        if(playlist.length === 0)
        	return `Sorry, we haven't any tracks from ${this.props.artistName}`

		return (
			<div>
				<MusicPlayer playlist={playlist} />
			</div>
		);
	}
}

export default Tracks;