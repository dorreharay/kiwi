import React, { Component } from 'react';

import styles from './DetailsPage.scss';

class SearchPage extends Component {
  state = {
    details: {},
  };

  componentDidMount() {
    const { match } = this.props;

    this.fetchProfile(match.params.username);
  }

  fetchProfile = async (username) => {
    try {
      const data = await fetch(`https://api.github.com/users/${username}`);
      const json = await data.json();

      this.setState({ details: json });
    } catch (e) {
      throw new Error(e);
    }
  }

  render() {
    const { details } = this.state;

    return (
      <div className={styles.main}>
        <div className={styles.container}>

          {details.length !== 0
            ? (
              <div className={styles.profile_container}>
                <img className={styles.profile_photo} src={details.avatar_url} alt="github profile" />
                <table>
                  <tbody>
                    <tr>
                      <td>Login</td>
                      <td>{details.login ? details.login : 'No data'}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>{details.name ? details.name : 'No data'}</td>
                    </tr>
                    <tr>
                      <td>Location</td>
                      <td>{details.location ? details.location : 'No data'}</td>
                    </tr>
                    <tr>
                      <td>Bio</td>
                      <td>{details.bio ? details.bio : 'No data'}</td>
                    </tr>
                    <tr>
                      <td>Creation date</td>
                      <td>{details.created_at ? details.created_at : 'No data'}</td>
                    </tr>
                    <tr>
                      <td>GitHub page</td>
                      <td>{details.html_url ? details.html_url : 'No data'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}
        </div>
      </div>
    );
  }
}

export default SearchPage;
