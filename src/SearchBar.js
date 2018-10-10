import React, { Component } from 'react';
import {Navbar, Button, FormGroup, FormControl} from 'react-bootstrap';
import './App.css';
import './SearchBar.css';

class SearchBar extends Component{
	render () {
		return(
			<div className="navebar">
              < Navbar className="bar" > 
                    < Navbar.Form  pullLeft > 
                    < FormGroup > 
                        < FormControl  type = " text " placeholder = "Artiste... "  /> 
                    </ FormGroup > { '' } 
                    < Button  type = " submit "> Rechercher </ Button > 
                    </ Navbar.Form > 
              </ Navbar > 
			</div>
		);
	}

}

export default SearchBar;