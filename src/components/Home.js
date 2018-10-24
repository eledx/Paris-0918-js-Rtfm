import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

/* Components */
import Header from './Header';


/* Components Material UI */
import { Grid, AppBar, Toolbar, InputBase } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from '@material-ui/core/styles';


/* Searchbar Style */
const styles = theme => ({
  appbar: {
    width: '60%',
  },
  toolbar: {
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

class Home extends Component {
  state = {
    userInput: '',  //contenu de la searchbar
    finalSearch: '', //resultat au submit ou au click sur la suggestion
    suggestions: [],  //stockage des suggestions
    ShowAutocompletion: false //gestion des suggestions vides
  }

  // Instructions à exécuter sur le changement de l'input:
  // afficher le nom d'artiste dans la searchbar & appeler l'autocomplétion
  searchBarDisplay = (event) => {
    this.setState({ userInput: event.target.value })
    if (event.target.value.length !== 0) {
      this.requestAutocompletion(event.target.value)
      this.setState({ ShowAutocompletion: true })
      //console.log('searchDisplay', this.state)
    }
    else
      this.setState({ ShowAutocompletion: false })
  }

  // Appel de l'API pour utiliser la méthode d'autocomplétion
  requestAutocompletion = (artist) => {
    fetch(`http://audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&limit=5&api_key=af05581a38f69802ba020346115c8834&format=json`)
      .then(resp => resp.json())
      .then(resp => this.setState({ suggestions: resp.results.artistmatches.artist }))
  }

  // Instructions à exécuter sur le clic du bouton submit
  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ finalSearch: event.target[0].value })
    //this.setState({ userInput: event.target[0].value })  verifier si pas de bugs sans. Si oui, a virer. 
    //this.setState({ ShowAutocompletion: false }) (passage par props avant routing)
    //console.log('submit', this.state)
  }

  render() {
    if (this.state.finalSearch.length > 0)
      return <Redirect to={`/similar-artist/${this.state.finalSearch}`} />

    const pointer = { cursor: 'pointer' };
    const { classes } = this.props;

    return (
      <Grid container justify='center' alignItems='center' className="bgHome">
        <Grid item xs={8}  >
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
                {this.state.ShowAutocompletion && (this.state.suggestions.map((element, i) =>
                  <Link to={`/similar-artist/${element.name}`}>
                    <p className={classes.p} key={i} style={pointer}>{element.name}</p>
                  </Link>
                ))}
              </div>
            </AppBar>
          </Grid>
        </Grid>
      </Grid>)
  }
}

export default withStyles(styles)(Home); 
