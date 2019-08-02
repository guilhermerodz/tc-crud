import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Wrapper,
  Sidebar,
  Board,
  SearchBar,
  RegisterButton,
  Content,
} from './styles';

export default function DefaultLayout({
  page: { component: Page, props: pageProps },
}) {
  const [search, setSearch] = useState('');
  const [searchEvent, setSearchEvent] = useState({
    label: '',
    type: 'init',
  });

  const [autoSearch, setAutoSearch] = useState(null);

  useEffect(() => {
    setAutoSearch(
      setTimeout(
        () =>
          setSearchEvent({
            label: search,
            type: 'auto',
          }),
        300
      )
    );
  }, [search]);

  async function handleSearch(e) {
    await e.preventDefault();

    setSearchEvent({
      label: search,
      type: 'submit',
    });
  }

  function handleSearchInputChange(e) {
    if (autoSearch) clearTimeout(autoSearch);

    setSearch(e.target.value);
  }

  return (
    <Wrapper>
      <Sidebar>
        <Link to="/">
          <h1>TradersClub</h1>
          <span>Pesquisar</span>
        </Link>
      </Sidebar>
      <Board>
        <SearchBar onSubmit={handleSearch}>
          <input
            value={search}
            onChange={handleSearchInputChange}
            placeholder="Pesquise por um veículo (comece por uma letra ou espaço)"
          />
          <RegisterButton to="/new" type="button">
            Cadastrar
          </RegisterButton>
        </SearchBar>
        <Content>
          <Page searchEvent={searchEvent} {...pageProps} />
        </Content>
      </Board>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  page: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
      .isRequired,
  }).isRequired,
};
