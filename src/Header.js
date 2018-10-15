import React, {Component} from 'react';
import {Typography, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const stylesH1 = withStyles => ({
    HeaderContainer:{
        marginTop: 55,
        marginBottom: 35,
    },
    HeaderTitle:{
        fontFamily: 'maiden',
        color: 'white',
        fontSize: 120,
    },
});

class Header extends Component{

    
    render(){
        return(
            
            <Grid container justify="center">
                <header className={this.props.classes.HeaderContainer}>
                    <Typography variant='h1' className={this.props.classes.HeaderTitle}>RTFM</Typography>
                </header>
            </Grid>
        );
    }

}

export default withStyles(stylesH1)(Header);
