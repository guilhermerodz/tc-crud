import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import Loading from '~/components/Loading';

import { Container, Scroll, CarList, Car, Banner } from './styles';

export default function Dashboard({ history, searchEvent }) {
  const [totalCars, setTotalCars] = useState(-1);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const container = useRef();

  useEffect(() => {
    async function getCarsAmount() {
      try {
        const { data } = await api.get('cars', {
          params: {
            search: '',
          },
        });

        /**
         * Filter only valid cars
         */
        setTotalCars(
          data.cars.filter(
            ({ id, title, model, brand, year, color, km, price }) => {
              return (
                id && title && model && brand && year && color && km && price
              );
            }
          ).length
        );
      } catch (error) {
        history.push('/500');
      } finally {
        if (container.current) setLoading(false);
      }
    }

    getCarsAmount();
  }, [history]);

  useEffect(() => {
    const { label } = searchEvent;

    if (!label) {
      setCars([]);
      return;
    }

    async function loadCars(search) {
      setLoading(true);

      try {
        const { data } = await api.get('cars', {
          params: {
            search,
          },
        });

        setCars(
          data.cars.reduce((validCars, car) => {
            const { id, title, model, brand, year, color, km, price } = car;

            /**
             * Check if car is valid
             */
            if (
              !(id && title && model && brand && year && color && km && price)
            )
              return validCars;

            /**
             * Parse data
             */
            car.km = parseInt(car.km);
            car.price = parseInt(price);
            car.year = parseInt(year);

            /**
             * Add formatted data
             */
            car.formattedKm = `${car.km.toLocaleString().replace(',', '.')} KM`;
            car.formattedPrice = formatPrice(car.price);

            validCars.push(car);
            return validCars;
          }, [])
        );
      } catch (error) {
        history.push('/500');
      } finally {
        if (container.current) setLoading(false);
      }
    }

    loadCars(label);
  }, [history, searchEvent]);

  return (
    <Container ref={container}>
      {!loading ? (
        cars.length > 0 ? (
          <Scroll>
            <CarList>
              {cars.map(car => (
                <li key={String(car.id)}>
                  <Link to={`/edit/${car.id}`}>
                    <Car>
                      <div className="car-left">
                        <strong className="car-title">{car.title}</strong>
                        <div className="car-details">
                          <span>{car.model}</span>
                          <span>{car.brand}</span>
                          <span>{car.formattedKm}</span>
                        </div>
                      </div>
                      <div className="car-right">
                        <strong className="car-price">
                          {car.formattedPrice}
                        </strong>
                        <span className="car-year">{car.year}</span>
                      </div>
                    </Car>
                  </Link>
                </li>
              ))}
            </CarList>
          </Scroll>
        ) : (
          <Banner>
            <h2>
              Pesquisa de veículos do <span>Traders Club</span>
            </h2>
            <span>Não há veículos com esse nome :(</span>
            {totalCars !== -1 && <span>Existem {totalCars} veículos</span>}
          </Banner>
        )
      ) : (
        <Loading />
      )}
    </Container>
  );
}
