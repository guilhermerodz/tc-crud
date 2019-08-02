import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

import colors from '~/styles/colors';

export const Container = styled.div``;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 55vh;
  padding: 5px 15px;

  overflow: hidden;
`;

export const CarList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  li {
    & + li {
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;

export const Car = styled.div`
  padding: 25px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${colors.text};
  background: transparent;

  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .car-left {
    text-align: left;
  }

  .car-right {
    text-align: right;
  }

  > div {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 20px;
    }

    .car-details > span {
      & + span {
        margin-left: 10px;
        padding-left: 15px;
        position: relative;

        &::before {
          position: absolute;
          left: 0;
          top: 8px;
          width: 5px;
          height: 5px;
          background: #fff;
          content: '';
          border-radius: 50%;
        }
      }
    }
  }
`;

export const Banner = styled.div`
  height: 100%;
  width: 100%;

  padding: 40px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    color: ${colors.text}

    font-weight: normal;

    max-width: 800px;
    text-align: center;

    font-family: 'Lobster Two', cursive;
    font-size: calc(5vh + 2vw);

    > span {
      font-weight: bold;
      padding: 0 20px;

      background: rgb(43, 68, 100, 0.9);

      border-radius: 10px;
    }
  }

  > span {
    margin-top: 50px;
    text-align: center;

    font-size: 30px;

    color: ${colors.placeholder}

    & + span {
      margin-top: 20px;
    }
  }
`;
