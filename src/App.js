import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import SimilarArtists from './SimilarArtists';
import './App.css';


/* Composants Material UI */
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar, InputBase } from '@material-ui/core';

  /* Installer npm install @material-ui/icons */
import SearchIcon from "@material-ui/icons/Search";

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

// Instructions à exécuter sur le changement de l'input:
// afficher le nom d'artiste dans la searchbar & appeler l'autocomplétion
searchBarDisplay = (event) => {
  this.setState({userInput: event.target.value})
  if(event.target.value.length !== 0){
    this.requestAutocompletion(event.target.value)
    this.setState({ShowAutocompletion:true})
    console.log('searchDisplay', this.state)
  }
  else
    this.setState({ShowAutocompletion: false})
}

//  Appel de l'API pour utiliser la méthode d'autocomplétion
requestAutocompletion = (artist) => {
  fetch(`http://audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&limit=5&api_key=af05581a38f69802ba020346115c8834&format=json`)
  .then(resp => resp.json())
  .then(resp => this.setState({suggestions : resp.results.artistmatches.artist}))
  }


// Instructions à exécuter sur le clic du bouton submit
handleSubmit = (event) => {
  event.preventDefault()
  this.setState({finalSearch: event.target[0].value})
  this.setState({userInput: event.target[0].value})
  this.setState({ShowAutocompletion:false})
  //console.log('submit', this.state)
}

// Instructions à exécuter sur le clic d'un nom d'artiste
handleArtistClick = (event) => {
  this.setState({finalSearch: event.target.innerText})
  this.setState({userInput: event.target.innerText})
  this.setState({ShowAutocompletion:false})
  //console.log('artistClick' , this.state)
}

render() {
  //console.log(this.state)

  const { classes } = this.props;
  //Denition de la const pointer
  const pointer = {cursor: 'pointer'};


  if(this.state.finalSearch !== null)
    return <SimilarArtists artistInput={this.state.finalSearch} />
  return (


    
    <MuiThemeProvider theme={theme}>

      <Grid container justify= 'center' className="bgHome">

          <Grid item  xs={8}  >

            <Header />
            
            <Grid container justify='center' alignItems='center' >
              <AppBar position="static" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>

                    <form onSubmit={this.handleSubmit} className={classes.form}>
                      <InputBase
                        type="text" 
                        placeholder="Your artist..."
                        value={this.state.userInput}
                        onChange={this.searchBarDisplay}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                      />
                    </form>
                  </div>
                </Toolbar>

                <div className={classes.resultAutocomplete}>
                  {this.state.ShowAutocompletion && (this.state.suggestions.map((element, i) => <p className={classes.p} key={i} style={pointer} onClick={this.handleArtistClick}>{element.name}</p>
                      ))}
                </div>
              </AppBar>
            </Grid>
            
            {/* <SimilarArtists artistInput={this.state.finalSearch} /> */}
        
            <BrowserRouter>
              <Switch>
                <Route path="/similarArtists" component={SimilarArtists}/>
              </Switch>
            </BrowserRouter>
        
            <Footer />
          </Grid>
        </Grid>
      </ MuiThemeProvider>
   
    





  /*  <div>
      <BrowserRouter>
        <div className="App">
            <header className="App-header">
              <h1>RTFM</h1>
              <form onSubmit={this.handleSubmit}>
                <input 
                type="text" 
                placeholder="Your artist"
                value={this.state.userInput}
                onChange={this.searchBarDisplay}/>
                <button>Search</button>
              </form>
              <div>
                {this.state.ShowAutocompletion && (this.state.suggestions.map((element, i) => <p key={i} onClick={this.handleArtistClick}>{element.name}</p>
                ))}
                </div>
            </header>*/
          /*{/* <SimilarArtists artistInput={this.state.finalSearch} /> }*/
  /*      <Switch>
          <Route path="/similarArtists" component={SimilarArtists}/>
        </Switch>
        </div>
      </BrowserRouter>
      <Footer />
    </div>*/
  );
}
}

export default withStyles(styles)(App);