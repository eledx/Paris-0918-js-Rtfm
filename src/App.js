import React, { Component } from 'react';
import Footer from './Footer';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SimilarArtists from './SimilarArtists';
import Home from './Home';
import './App.css';

/* Composants Material UI */
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FicheArtist from './FicheArtist';

  /* Installer npm install @material-ui/icons */





/* Création d'un théme */
const theme = createMuiTheme({
  palette:{
      primary: { main: '#FFFFFF'},
  },
  typography: { 
      fontFamily: 'Open Sans',
  }
});



/* Style pour la barre de recherche */
const styles = theme => ({
  appbar:{
    width: '75%',
  },
  toolbar:{
    minHeight: 45,
  },
search: {
  position: "relative",
  marginLeft: 0,
  width: "100%",
},
searchIcon: {
  width: 50,
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
},
inputRoot: {
  color: "inherit",
  width: "100%"
},
inputInput: {
  fontSize: 20,
  paddingTop: theme.spacing.unit,
  paddingRight: theme.spacing.unit,
  paddingBottom: theme.spacing.unit,
  paddingLeft: 60,
  transition: theme.transitions.create("width"),
  width: "100%",
},
resultAutocomplete: {
  marginLeft: 48,
  marginRight: 48,
  backgroundColor: theme.palette.primary,
},
});

/* Material UI */




class App extends Component {

constructor() {
  super()
  this.state = {
    userInput: '',
    finalSearch: null,
    suggestions: [],
    ShowAutocompletion: false
  }
}




render() {
  if(this.state.finalSearch !== null)

    return <SimilarArtists artistInput={this.state.finalSearch} />
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container justify= 'center' className="bgHome">
          {/* <Grid item  xs={8}  > */}
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/similar-artist/:name" component={SimilarArtists}/>
                <Route exact path="/fiche-artist/:name" component={FicheArtist}/>
              </Switch>
            </BrowserRouter>

            <Footer />
          {/* </Grid> */}
        </Grid>
      </ MuiThemeProvider>
  

  );
}
}

export default withStyles(styles)(App);