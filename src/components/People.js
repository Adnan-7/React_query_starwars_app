import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async () => {
  const { data } = await axios.get('https://swapi.dev/api/people/');
  return data;
};

const People = () => {
  const { data, status } = useQuery('people', fetchPeople);
  console.log(data.count);
  return (
    <div>
      <h2>People</h2>

      {status === 'error' && <div>Error Fetching data</div>}

      {status === 'loading' && <div>Loading data...</div>}

      {status === 'success' && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
