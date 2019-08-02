import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '~/pages/Dashboard';
import New from '~/pages/New';
import Edit from '~/pages/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/new" exact component={New} />
      <Route path="/edit/:id" exact component={Edit} />

      <Route
        path="/500"
        exact
        component={() => <h1>500 - Check if API is online</h1>}
      />
      <Route path="/" component={() => <h1>404 - Resource not found</h1>} />
    </Switch>
  );
}
