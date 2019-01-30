import React, { Component } from 'react';
import { debounce } from 'lodash';

import { Table, List } from 'components';

import styles from './SearchPage.scss';

class SearchPage extends Component {
  state = {
    search: '',
    list: [],
    tableView: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;

    if (prevState.search !== search) {
      this.fetchUsers(search);
    }
  }

  fetchUsers = async (search) => {
    try {
      if (search === '') {
        this.setState({ list: [] });
      } else {
        const data = await fetch(`https://api.github.com/search/users?per_page=10&q=${search}`);
        const json = await data.json();

        this.setState({ list: json.items });
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  // componentWillUnmount(){
  //   this.debounceEvent.cancel();
  // }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  toggleView = () => {
    const { tableView } = this.state;

    this.setState({ tableView: !tableView });
  }

  debounceEvent(...args) {
    this.debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  render() {
    const { list, tableView } = this.state;

    return (
      <div className={styles.main}>
        <div className={styles.title}>
          Table/list
          <label htmlFor="checker" className={styles.switch}>
            <input type="checkbox" id="checker" onChange={this.toggleView} checked={tableView} />
            <span className={styles.slider} />
          </label>
        </div>
        <input type="text" onChange={this.debounceEvent(this.handleChange, 500)} placeholder="find github profiles" />
        {list.length !== 0 ? (
          <div className={styles.container}>
            {tableView ? <Table list={list} /> : <List list={list} />}
          </div>
        ) : null}
      </div>
    );
  }
}

export default SearchPage;
