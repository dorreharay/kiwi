import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ list }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Details</th>
          <th>Link to profile</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <tr key={item.login}>
            <td>{item.login}</td>
            <td><Link to={`/search/details/${item.login}`}>click</Link></td>
            <td>
              <a href={item.html_url} target="_blank" rel="noopener noreferrer">
                <div>{item.html_url}</div>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
