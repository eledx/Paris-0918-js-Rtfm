import React, {Component} from 'react';
import { Grid, AppBar, Toolbar, InputBase } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';

class Home extends Component {
    state = {
        userInput: '',
        finalSearch: null,
        suggestions: [],
        ShowAutocompletion: false
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
  // handleArtistClick = (event) => {
  //   this.setState({finalSearch: event.target.innerText})
  //   this.setState({userInput: event.target.innerText})
  //   this.setState({ShowAutocompletion:false})
  //   //console.log('artistClick' , this.state)
  // }

    render(){
        const pointer = {cursor: 'pointer'};

        const { classes } = this.props;
        return(
        <Grid container justify='center' alignItems='center' >
        <Grid item  xs={8}  >
        <Header/>
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
      </Grid>)
    }
}

export default withStyles()(Home); 
