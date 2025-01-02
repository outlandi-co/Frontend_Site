import { useEffect, useState } from 'react';
import { fetchTest } from '../services/api';

const TestComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchTest();
                if (result && result.message) {
                    setMessage(result.message);
                } else {
                    setMessage('Error loading message.');
                }
            } catch (error) {
                setMessage('Error fetching data.');
                console.error('Error:', error);
            }
        };

        getData();
    }, []);

    return (
        <div>
            <h2>Test API</h2>
            <p>{message}</p>
        </div>
    );
};

export default TestComponent;
