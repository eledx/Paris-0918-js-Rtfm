import React, { Component } from 'react';
import {Typography, Grid} from '@material-ui/core';

import './Footer.css';

class Footer extends Component{
	render () {
		return(
			
			<Grid container direction="column"  alignItems="center">
				<footer>
					<Typography variant='h5' align='center' color='secondary'></Typography>
				</footer>
			</Grid>
			/*ENGUERRAND LE FOOTER !*/
		);
	}

}

export default Footer;