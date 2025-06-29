import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import MedicineDetail from "./MedicineDetail";

const WEATHER_API_KEY = "2a73c62141dbdcf079b4087ecd1a7b9f";

const CountryWeatherAndPrediction = () => {
  const [country, setCountry] = useState("");
  const [info, setInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [suggested, setSuggested] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [error, setError] = useState("");

  const fetchInfo = async () => {
    setError("");
    setInfo(null);
    setWeather(null);
    setSuggested([]);
    setSelectedMedicine("");

    try {
      const res = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
      const data = res.data[0];
      setInfo(data);
      const capital = data.capital?.[0];

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const w = weatherRes.data;
      setWeather(w);

      const temp = w.main.temp;
      const condition = w.weather[0].main;

      let predicted = [];

      if (temp > 35) {
        predicted.push("ORS", "sunscreen", "hydration tablets");
      } else if (temp > 30) {
        predicted.push("electrolyte powder", "sun hat", "light painkillers");
      }

      if (temp < 10) {
        predicted.push("cold medicine", "cough syrup", "thermometer");
      } else if (temp < 20) {
        predicted.push("warm packs", "vitamin C", "nasal spray");
      }

      if (condition.toLowerCase().includes("rain")) {
        predicted.push("mosquito repellent", "allergy medicine", "antifungal cream");
      }

      if (condition.toLowerCase().includes("cloud")) {
        predicted.push("vitamin D supplements", "immune booster");
      }

      predicted.push("band-aids", "pain reliever", "sanitizer");

      setSuggested(predicted);
    } catch (err) {
      setError("Country or weather data unavailable.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">🌍 Travel Health Predictor</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country name"
          className="border p-2 flex-1 rounded"
        />
        <button onClick={fetchInfo} className="bg-blue-600 text-white px-4 py-2 rounded">
          Analyze
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <AnimatePresence>
        {info && (
          <motion.div
            className="space-y-1 text-left mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>🌆 <strong>Capital:</strong> {info.capital?.[0]}</p>
            <p>💱 <strong>Currency:</strong> {Object.keys(info.currencies)[0]}</p>
            <p>🌍 <strong>Region:</strong> {info.region}</p>
            <img src={info.flags.svg} alt="flag" className="w-20 border" />
          </motion.div>
        )}

        {weather && (
          <motion.div
            className="text-left mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>🌡️ <strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p>⛅ <strong>Condition:</strong> {weather.weather[0].main}</p>
          </motion.div>
        )}

        {suggested.length > 0 && (
          <motion.div
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="font-semibold mb-1">💊 Suggested Medicines to Carry:</h4>
            <p className="text-sm text-gray-500 mb-2">Based on your travel weather and region</p>
            <motion.ul
              className="list-disc ml-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {suggested.map((med, i) => (
                <motion.li
                  key={i}
                  className="cursor-pointer text-blue-700 underline"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedMedicine(med)}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {med}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}

        {selectedMedicine && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MedicineDetail drug={selectedMedicine} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryWeatherAndPrediction;
