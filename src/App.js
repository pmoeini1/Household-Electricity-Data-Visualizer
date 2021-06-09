import React from 'react';
import BarChart from './BarChart';
import './App.css';

/* 
[{2014: 0.8372198569773267}, {2015: 0.8810942877155461}, {2016: 0.9372663371115652}, {2017: 0.905654504506011}, {2018: 0.9938830002040079}, {2019: 0.8937834674353268}]
*/

const data = [
  {year: 2014, kw: 0.837, temp: 6.78},
  {year: 2015, kw: 0.881, temp: 7.97},
  {year: 2016, kw: 0.937, temp: 9.27},
  {year: 2017, kw: 0.906, temp: 8.75},
  {year : 2018, kw: 0.994, temp: 8.24},
  {year: 2019, kw: 0.894, temp: 8.94},
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BarChart data={data} />
      </header>
    </div>
  );
}

export default App;