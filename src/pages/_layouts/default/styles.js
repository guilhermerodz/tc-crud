import styled from 'styled-components';

import colors from '~/styles/colors';

import logo from '~/assets/logo-tc.png';

import wireframe from '~/assets/car-wireframe.png';

import { OpaqueLink } from '~/components/Button';

export const Wrapper = styled.div`
  height: 100%;

  display: flex;
  width: 100%;

  background: #1f2d40;
`;

export const Sidebar = styled.aside`
  padding-top: 60px;

  width: 260px;
  height: 100%;

  display: flex;
  justify-content: center;

  background: #0e1823;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: min-content;

    transition: transform .2s;

    > span {
      color: ${colors.text}
      padding: 10px 0;
    }

    > h1 {
      display: inline-block;
      background: url(${logo}) no-repeat;
      width: 80px;
      height: 80px;
      text-indent: -999em;
    }

    &:hover {
      transform: scale(1.1)
    }
  }
`;

export const Board = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const SearchBar = styled.form`
  width: 100%;

  background-color: #1a2433;
  padding: 50px 70px;
  display: flex;
  justify-content: space-between;

  input {
    width: 100%;

    padding: 13px 10px;

    font-size: 20px;
    background: none;
    color: ${colors.text};

    border: 2px solid ${colors.placeholder};
    border-radius: 5px;

    &::placeholder {
      color: ${colors.placeholder};
    }
  }
`;

export const Content = styled.div`
  flex: 1;

  padding: 50px 80px;

  overflow: hidden;

  background: linear-gradient(rgb(31, 45, 64, 0.9), rgb(31, 45, 64, 0.9)),
    url(${wireframe}) no-repeat center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
`;

export const RegisterButton = styled(OpaqueLink)`
  margin-left: 25px;
`;
