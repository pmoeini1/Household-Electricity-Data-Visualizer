import React from 'react';
import BarChart from './BarChart';
import './App.css';

const data = [
  {year: 2014, kw: 1.145, temp: 6.78},
  {year: 2015, kw: 1.312, temp: 7.97},
  {year: 2016, kw: 1.362, temp: 9.27},
  {year: 2017, kw: 1.448, temp: 8.75},
  {year : 2018, kw: 1.458, temp: 8.24},
  {year: 2019, kw: 1.425, temp: 8.94},
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