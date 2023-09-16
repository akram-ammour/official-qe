import React, { useEffect, useState } from 'react';
import './quotescontainer.css';
import { quotes } from './quotes';

const QuotesContainer = () => {
  const [counter, setCounter] = useState(Math.floor(Math.random() * quotes.length));

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCounter(randomIndex);
    }, 120000); // Change quote every 2 minutes (120,000 milliseconds)

    return () => {
      clearInterval(interval); // Clear the interval when component unmounts
    };
  }, []);

  return (
    <div className='app__quotescontainer'>
      <div className='app__quotescontainer-pannel'>
        <p>quote of the day</p>
        <p>{counter + 1}/100</p>
      </div>
      <h2>{quotes[counter]}</h2>
    </div>
  );
};

export default QuotesContainer;
