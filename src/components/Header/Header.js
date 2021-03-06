import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';

import styles from './Header.scss';

class Header extends Component {
  signInWithGithub = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    await firebase.auth().signInWithPopup(provider);
  };

  signOutFromGithub = async () => {
    await firebase.auth().signOut();
  }

  render() {
    const { signed } = this.props;
    const { currentLocation } = this.props;

    return (
      <header>
        <section className={styles.nav}>
          <ul className={styles.ulNav}>
            <Link
              to="/"
              className={currentLocation === '/' ? styles.tabHovered : styles.tab}
            >
              Home
            </Link>
            {signed ? (
              <Link
                to="/search"
                className={currentLocation.includes('/search') ? styles.tabHovered : styles.tab}
              >
                Find users
              </Link>
            ) : null}
          </ul>
          {signed !== undefined ? (
            <button type="button" className={styles.exit}>
              {signed ? <Link to="/" onClick={this.signOutFromGithub}>Вийти</Link> : <Link to="/" onClick={this.signInWithGithub}>Увійти</Link>}
            </button>
          ) : null}
        </section>
      </header>
    );
  }
}


export default Header;
