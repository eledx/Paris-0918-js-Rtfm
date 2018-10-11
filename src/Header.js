import React, { Component } from 'react';
import logo from './logo.jpg'
import './Header.css';

class Header extends Component{
	render () {
		return(
			<div>

                <header>
                    <img src={logo} className="logo" alt="logo-site" />
                    <h1 className="headerH1">RTFM</h1>
                </header>
			</div>
		);
	}

}

export default Header;