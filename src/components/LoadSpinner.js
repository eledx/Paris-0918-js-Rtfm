import React, { Component } from 'react';
import { css } from 'react-emotion';
import { ScaleLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
	border-color: red;
	  display: inline-flex;
    vertical-align: middle;
`;

class LoadSpinner extends Component {
	state = {
		loading: true
	}

	render() {
		return (
			<div className='sweet-loading'>
	        	<ScaleLoader
					className={override}
					sizeUnit={"px"}
					size={180}
					color={'#D71818'}
					loading={this.state.loading}
	        	/>
			</div> 
		);
	}
}

export default LoadSpinner;