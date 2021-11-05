import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (page) => {
  const { data } = await axios.get(
    `https://swapi.dev/api/planets/?page=${page}`
  );
  return data;
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['planets', page], () =>
    fetchPlanets(page)
  );

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && <div>Loading data...</div>}

      {status === 'error' && <div>Error Fetching data</div>}

      {status === 'success' && (
        <React.Fragment>
          <button
            onClick={() => setPage((previousValue) => previousValue - 1)}
            disabled={page <= 1}>
            Previous Page
          </button>
          <span>{page}</span>

          <button
            disabled={page >= data.next}
            onClick={() => setPage((previousValue) => previousValue + 1)}>
            Next Page
          </button>
          {data.results.map((planet) => (
            <Planet key={planet.name} planet={planet} />
          ))}
          {console.log(data)}
        </React.Fragment>
      )}
    </div>
  );
};

export default Planets;
