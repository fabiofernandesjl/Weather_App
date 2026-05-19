import { useState } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import type { City } from "./components/Search"; // importando a inteface City do componente Search.

const App = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <>
      <div className="relative z-10 h-screen w-screen flex flex-col bg-linear-to-b from-sky-400 to-blue-600">
        <Search onCitySelect={setSelectedCity} />
        {selectedCity && <WeatherCard city={selectedCity} />}
      </div>
    </>
  );
};

export default App;
