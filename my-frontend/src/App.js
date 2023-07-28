// src/App.js
import React, { useState } from 'react';
import axios from 'axios';


const App = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockData, setStockData] = useState(null);

  const apiKey = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=yiT_8P8s3VfPksUq9oDz85MMLhXswj_z'; // Replace with your API key

  const handleFetchData = () => {
    if (stockSymbol) {
      const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;

      axios.get(apiUrl)
        .then(response => {
          setStockData(response.data["Global Quote"]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };

  return (
    <div className="App">
      <h1>Stock Market Data</h1>
      <label htmlFor="stockSymbol">Stock Symbol:</label>
      <input
        type="text"
        id="stockSymbol"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <button onClick={handleFetchData}>Fetch Data</button>
      {stockData && (
        <div id="stockData">
          <h2>Stock Data for {stockData["01. symbol"]}</h2>
          <p>Open: {stockData["02. open"]}</p>
          <p>High: {stockData["03. high"]}</p>
          <p>Low: {stockData["04. low"]}</p>
          <p>Price: {stockData["05. price"]}</p>
          <p>Volume: {stockData["06. volume"]}</p>
          <p>Latest Trading Day: {stockData["07. latest trading day"]}</p>
          <p>Previous Close: {stockData["08. previous close"]}</p>
          <p>Change: {stockData["09. change"]}</p>
          <p>Change Percent: {stockData["10. change percent"]}</p>
        </div>
      )}
    </div>
    
  );
};


  


export default App;
