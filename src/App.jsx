import React from 'react';
import './App.css';
import CountryWeatherAndPrediction from './components/CountryWeatherAndPrediction'; // 👈 make sure this path is correct

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">💊 MedGenie</h1>

      {/* Insert your main health predictor component here */}
      <CountryWeatherAndPrediction />
    </div>
  );
}

export default App;
