import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import Person from './Person';

const maxPeoplePage = 9;
const fetchPeople = async (page) => {
  const { data } = await axios.get(`https://swapi.dev/api/people?page=${page}`);
  return data;
};

const People = () => {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page < maxPeoplePage) {
      const nextPage = page + 1;
      queryClient.prefetchQuery(['people', nextPage], () =>
        fetchPeople(nextPage)
      );
    }
  }, []);

  const { data, status } = useQuery(['people', page], () => fetchPeople(page), {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>People</h2>

      {status === 'error' && <div>Error Fetching data</div>}

      {status === 'loading' && <div>Loading data...</div>}

      {status === 'success' && (
        <div>
          <button
            onClick={() => setPage((previousValue) => previousValue - 1)}
            disabled={page <= 1}>
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage((previousValue) => previousValue + 1)}
            disabled={page >= data.next}>
            Next Page
          </button>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
