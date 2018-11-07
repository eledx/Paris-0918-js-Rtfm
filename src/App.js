import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

/* Components Pages */
import SimilarArtists from './components/SimilarArtists';
import FicheArtist from './components/FicheArtist';
import Home from './components/Home';
import Erreur from './components/Erreur';

/* CSS */
import './App.css';

/* Components Material UI */
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

/* Theme Creation */
const theme = createMuiTheme({
  palette: {
    primary: { main: '#FFFFFF' },
  },
  typography: {
    fontFamily: 'Open Sans',
  }
});


const App = (props)=> {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/similar-artist/:name" component={SimilarArtists} />
            <Route exact path="/fiche-artist/:name" component={FicheArtist} />
            <Route exact path="/404" component={Erreur} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
}

export default App;