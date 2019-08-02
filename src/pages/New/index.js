import React, { useState, useEffect, useRef } from 'react';
import { Input, Select } from '@rocketseat/unform';

import api from '~/services/api';

import { storeSchema } from '~/validation/Car';

import Loading from '~/components/Loading';
import Form from '~/components/Form';
import { OpaqueButton, TransparentButton } from '~/components/Button';

import { Container } from './styles';

export default function Edit({ history }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [brandOptions, setBrandOptions] = useState([]);

  const container = useRef();

  useEffect(() => {
    async function loadCar() {
      const brands = await api.get('brands');

      const brandData = brands.data.brands.map(brand => ({
        id: brand.id,
        title: brand.name,
      }));

      if (!container.current) return;

      setBrandOptions(brandData);
      setLoading(false);
    }

    loadCar();
  }, []);

  async function handleCreate(data) {
    try {
      await storeSchema.validate(data);

      const brand = brandOptions.find(b => String(b.id) === data.brand).title;

      const { id, color, km, model, price, title, year } = data;

      await api.post(`cars`, {
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

  return (
    <Container ref={container}>
      {!loading ? (
        <>
          <Form onSubmit={handleCreate}>
            {error && <span className="error">{error}</span>}
            <Input
              name="id"
              placeholder="ID (número inteiro para identificação)"
            />

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
                <TransparentButton
                  onClick={() => history.push('/')}
                  type="button"
                >
                  Cancelar
                </TransparentButton>
              </div>

              <div className="right-actions">
                <OpaqueButton type="submit">Cadastrar veículo</OpaqueButton>
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
