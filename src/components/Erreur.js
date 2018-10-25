import React from 'react';
import './Erreur.css';
import '../App.css';
import {Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const styles = () => ({
        link:{
                fontFamily: 'blood',
                fontSize:130,
		color:'#ce0404',
                textShadow: '5px 5px rgba(0,0,0, 1)',
                textAlign:"center",
                marginTop:20,
                
                },
        text1:{
                fontFamily: 'stamp',
                fontSize:90,
		color:'#ce0404',
                textShadow: '5px 5px rgba(0,0,0, 1)',
                textAlign:"center",
                marginTop:450,
                },
        text2:{
                fontFamily: 'stamp',
                fontSize:40,
                color:'#cccccc',
                textShadow: '5px 5px rgba(0,0,0, 1)',
                textAlign:"center",
                marginTop:10,
                },
        erreur:{
                minWith:100,
        }
})

const Erreur = (props) => {
        const { classes } = props;
	return (
                
        <div className="erreur">
                <Grid container className={classes.container} justify="center">
                        <Link to={`/`} className={classes.link} style={{textDecoration:'none'}}>4.0.4</Link>
                        <Grid item xs={12} className={classes.text1}> WELCOME IN HELL</Grid>
                        <Grid item xs={12}  className={classes.text2}>U found a dead link, bro!</Grid>
                </Grid> 
        </div>
        )
}

export default withStyles(styles) (Erreur);
