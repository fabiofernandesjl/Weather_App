import { useEffect, useState } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import type { City } from "./components/Search"; // importando a inteface City do componente Search.

interface TimeDay {
  is_day: number;
}

interface TimeDayResponse {
  current?: TimeDay | any;
}

const App = () => {
  const [selectedCity, setSelectedCity] = useState<City | any>(null);
  const [isDay, setIsDay] = useState<TimeDayResponse | any>(1);

  useEffect(() => {
    // Caso nenhuma cidade tenha sido escolhida ainda, não retorna nada
    if (!selectedCity) return;

    const fetchTimeDay = async (selectedCity: City): Promise<City[] | any> => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=is_day`,
        );
        const data: TimeDayResponse = await response.json();
        if (data.current) {
          // console.log(data.current.is_day); // Teste de retorno dos dados
          setIsDay(data.current.is_day);
        }
      } catch (error) {
        console.error("Conexão não estabelicida");
      }
    };

    fetchTimeDay(selectedCity);
  }, [selectedCity]);

  return (
    <>
      <div
        className={`relative z-10 h-screen w-screen flex flex-col bg-linear-to-b ${isDay == 1 ? "from-sky-400 to-blue-600" : "from-slate-900 via-indigo-950 to-slate-900"}`}
      >
        <Search onCitySelect={setSelectedCity} />
        {selectedCity && <WeatherCard city={selectedCity} />}
      </div>
    </>
  );
};

export default App;
