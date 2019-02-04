import React, { Component, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import firebase from './firebase';

import styles from './components/Home/Home.scss';

const Home = (lazy(() => (import('components/Home/Home'))));
const Header = (lazy(() => (import('components/Header/Header'))));
const SearchPage = (lazy(() => (import('components/SearchPage/SearchPage'))));
const DetailsPage = (lazy(() => (import('components/DetailsPage/DetailsPage'))));

class App extends Component {
  state = {
    signed: undefined,
  }

  componentDidMount() {
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

    if (signed === undefined && location.pathname !== '/') {
      return <div className={styles.main}>Loading...</div>;
    }

    return (
      <div>
        <Suspense fallback={<div className={styles.main}>Loading...</div>}>
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
                      <div className={styles.main}>
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
        </Suspense>
      </div>
    );
  }
}

export default App;
