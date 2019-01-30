import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Home,
  Header,
  SearchPage,
  DetailsPage,
} from 'components';

function App() {
  return (
    <Router>
      <Route render={({ location }) => (
        <div>
          <Header currentLocation={location.pathname} />
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/search/details/:username" component={DetailsPage} />
            <Route render={() => (
              <div style={{ marginLeft: '47%', marginTop: '20%' }}>Not Found</div>
            )}
            />
          </Switch>
        </div>
      )}
      />
    </Router>
  );
}

export default App;
