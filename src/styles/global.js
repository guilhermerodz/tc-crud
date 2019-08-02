import { createGlobalStyle } from 'styled-components';

import 'react-activity/dist/react-activity.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lobster+Two:400,700|Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialised;
  }

  body, input, button {
    font: 18px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
