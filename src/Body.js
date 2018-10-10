import React, { Component } from 'react';
import './App.css';
import concert2 from './concert2.jpeg';
import './Body.css';
import SearchBar from './SearchBar';

class Body extends Component{
	render () {
		return(
			<div>
                <body className="corps">
                    <SearchBar />
                    <img src={concert2} className="accueil" alt="concert" />           
                </body>
			</div>
		);
	}

}

export default Body;