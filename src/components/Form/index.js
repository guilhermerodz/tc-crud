import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

import colors from '~/styles/colors';

export default styled(Form)`
  display: flex;
  flex-direction: column;

  > :not(:first-child) {
    margin-top: 30px;
  }

  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
  }

  input {
    padding: 10px;

    color: ${colors.text};
    background: transparent;

    border: 0;
    border-bottom: 2px solid ${colors.text};

    &:placeholder {
      color: ${colors.placeholder};
    }
  }

  select {
    padding: 10px;

    font-size: 16px;

    color: ${colors.text};
    background: transparent;

    border-radius: 4px;
    border: 2px solid ${colors.text};

    > option {
      background: ${colors.darkText};
    }
  }

  button {
    padding: 10px 25px;

    & + button {
      margin-left: 10px;
    }
  }

  > div.actions {
    display: flex;
    justify-content: space-between;
  }
`;
