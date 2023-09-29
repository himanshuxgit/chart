// App.js

import React from 'react';
import ChartComponent from './components/ChartComponent';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div className="container">

      <div className="chart-container">
        <ChartComponent />
      </div>
    </div>
  );
};

export default App;
