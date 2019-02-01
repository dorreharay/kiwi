import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';

import {
  Home,
  Header,
  SearchPage,
  DetailsPage,
} from 'components';

import firebase from './firebase';

class App extends Component {
  state = {
    signed: undefined,
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ signed: true });
      } else {
        this.setState({ signed: false });
      }
    });
  }

  render() {
    const { signed } = this.state;

    return (
      <div>
        <Router>
          <Route render={({ location }) => (
            <div>
              {location.pathname === '/' || location.pathname.includes('/search') ? <Header signed={signed} currentLocation={location.pathname} /> : null}
              {signed !== undefined && !signed && location.pathname !== '/' ? (
                <Redirect to="/" />
              ) : (
                <Switch location={location}>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/search" component={SearchPage} />
                  <Route exact path="/search/:q" component={SearchPage} />
                  <Route exact path="/search/details/:username" component={DetailsPage} />
                  <Route render={() => (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      height: '90vh',
                    }}
                    >
                      <span>Not Found</span>
                      <Link to="/">Back to home</Link>
                    </div>
                  )}
                  />
                </Switch>
              )}
            </div>
          )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
