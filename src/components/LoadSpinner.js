import React, { Component } from 'react';
import { css } from 'react-emotion';
import { ScaleLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class LoadSpinner extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      loading: true
	    }
  	}

	render() {
		return (
			<div className='sweet-loading'>
	        	<ScaleLoader
		          className={override}
		          sizeUnit={"px"}
		          size={150}
		          color={'#604c8d'}
		          loading={this.state.loading}
	        	/>
     		</div> 
		);
	}
}

export default LoadSpinner;