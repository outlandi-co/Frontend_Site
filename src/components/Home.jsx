import { useEffect, useState } from 'react';
import { fetchData } from '../services/api'; // Import fetchData from services

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData(); // Call fetchData
        setData(result); // Set fetched data to state
      } catch (err) {
        setError(err.message); // Set error message
      }
    };

    getData(); // Fetch data when the component mounts
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Show error if there's an issue
  }

  return (
    <div>
      <h1>Data Fetched from API</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
