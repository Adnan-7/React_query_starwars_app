import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async () => {
  const { data } = await axios.get('https://swapi.dev/api/planets/');
  return data;
};

const Planets = () => {
  const { data, status } = useQuery('planets', fetchPlanets);
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && <div>Loading data...</div>}

      {status === 'error' && <div>Error Fetching data</div>}

      {status === 'success' && (
        <div>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
