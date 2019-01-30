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

  componentDidMount() {
    const { match } = this.props;
    if (match.params.q !== ' ' && match.params.q !== undefined) {
      this.fetchUsers(match.params.q);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    const { match } = this.props;
    if (prevState.search !== search && match.params.q !== undefined) {
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
    const { history } = this.props;
    this.setState({ search: e.target.value });
    history.push(`/search/${e.target.value}`, { state: e.target.value })
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
    const { match } = this.props;
    
    return (
      <div className={styles.main}>
        <div className={styles.title}>
          Table/list
          <label htmlFor="checker" className={styles.switch}>
            <input type="checkbox" id="checker" onChange={this.toggleView} checked={tableView} />
            <span className={styles.slider} />
          </label>
        </div>
        <input type="text" onChange={this.debounceEvent(this.handleChange, 500)} placeholder="find github profiles" defaultValue={match.params.q}/>
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
