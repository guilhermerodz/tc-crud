import React from 'react';
import { Route } from 'react-router-dom';

import PropTypes from 'prop-types';

import DefaultLayout from '~/pages/_layouts/default';

export default function RouteWrapper({ component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => <DefaultLayout page={{ component, props }} />}
    />
  );
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
