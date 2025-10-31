import { useState, useEffect } from 'react';
import axios from 'axios';

export const useVerbs = (API_URL, level) => {
  const [initialArr, setInitialArr] = useState([]);
  const [currentArr, setCurrentArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setInitialArr(response.data);
      } catch (err) {
        console.error("Error fetching words:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, []);

  useEffect(() => {
    if (initialArr.length > 0) {
      setCurrentArr(initialArr.filter(e => e.level === level));
    }
  }, [initialArr, level]);

  return { currentArr, setCurrentArr, loading };
};