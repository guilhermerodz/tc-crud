import React from 'react';

import { Bounce } from 'react-activity';

import { Container } from './styles';

const Loading = () => (
  <Container>
    <Bounce size={60} />
  </Container>
);

export default Loading;
