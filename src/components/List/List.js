import React from 'react';
import { Link } from 'react-router-dom';

import styles from './List.scss';

const List = ({ list }) => (
  <div className={styles.list_container}>
    {list.map(item => (
      <div key={item.login} className={styles.card}>
        <div>
          <span>Login</span>
          <span>{item.login}</span>
        </div>
        <div>
          <span>Details</span>
          <span><Link to={`/search/details/${item.login}`}>click</Link></span>
        </div>
        <div>
          <span>Link to profile</span>
          <span>
            <a href={item.html_url} target="_blank" rel="noopener noreferrer">
              <div>{item.html_url}</div>
            </a>
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default List;
