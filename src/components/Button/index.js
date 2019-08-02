import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import colors from '~/styles/colors';

const opaque = css`
  color: ${colors.darkText};
  background: ${colors.text};
`;

const transparent = css`
  color: ${colors.text};
  border: 2px solid ${colors.text};

  background: transparent;
`;

const style = css`
  padding: 0 20px;

  font-weight: bold;
  font-size: 20px;

  border: 0;
  border-radius: 5px;
`;

const centered = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OpaqueButton = styled.button`
  ${style}
  ${opaque}
`;

export const TransparentButton = styled.button`
  ${style}
  ${transparent}
`;

export const OpaqueLink = styled(Link)`
  ${centered}
  ${style}
  ${opaque}
`;

export const TransparentLink = styled(Link)`
  ${centered}
  ${style}
  ${transparent}
`;
