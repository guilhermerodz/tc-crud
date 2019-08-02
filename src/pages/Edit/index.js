import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from '@rocketseat/unform';

import api from '~/services/api';

import { updateSchema } from '~/validation/Car';

import Loading from '~/components/Loading';
import Form from '~/components/Form';
import { OpaqueButton, TransparentButton } from '~/components/Button';

import { Container } from './styles';

export default function Edit({ history, match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [car, setCar] = useState(null);
  const [brandOptions, setBrandOptions] = useState([]);

  const { id } = useMemo(() => match.params, [match.params]);

  const container = useRef();

  useEffect(() => {
    async function loadCar() {
      const [brands, cars] = await Promise.all([
        api.get('brands'),
        api.get('cars', { params: { search: '' } }),
      ]);

      const carData = cars.data.cars.find(c => String(c.id) === String(id));

      if (!carData) {
        history.push('/404');
      }

      const brandData = brands.data.brands.map(brand => ({
        id: brand.id,
        title: brand.name,
      }));

      if (!container.current) return;

      setBrandOptions(brandData);
      setCar(carData);

      setLoading(false);
    }

    loadCar();
  }, [history, id, match.params]);

  async function handleUpdate(data) {
    try {
      await updateSchema.validate(data);

      const brand = brandOptions.find(b => String(b.id) === data.brand).title;

      const { color, km, model, price, title, year } = data;

      await api.put(`cars/${id}`, {
        car: {
          id,
          brand,
          color,
          km,
          model,
          price,
          title,
          year,
        },
      });

      history.push('/');
    } catch ({ errors }) {
      if (container.current) setError(errors);
    }
  }

  async function handleRemove() {
    try {
      await api.delete(`cars/${id}`);

      history.push('/');
    } catch ({ errors }) {
      if (container.current) setError(errors);
    }
  }

  return (
    <Container ref={container}>
      {!loading ? (
        <>
          <Form initialData={car} onSubmit={handleUpdate}>
            {error && <span className="error">{error}</span>}
            <Input name="title" placeholder="Título" />

            <div>
              <Input name="model" placeholder="Modelo" />
              <Input name="year" placeholder="Ano" />
            </div>

            <Select name="brand" options={brandOptions} />

            <div>
              <Input name="km" placeholder="KM" />
              <Input name="color" placeholder="Cor" />
            </div>

            <Input name="price" placeholder="Preço" />

            <div className="actions">
              <div className="left-actions">
                <TransparentButton onClick={handleRemove} type="button">
                  Remover
                </TransparentButton>
                <TransparentButton
                  onClick={() => history.push('/')}
                  type="button"
                >
                  Cancelar
                </TransparentButton>
              </div>

              <div className="right-actions">
                <OpaqueButton type="submit">Salvar</OpaqueButton>
              </div>
            </div>
          </Form>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
