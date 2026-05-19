import { CloudSunIcon, MapPinIcon } from "@phosphor-icons/react";
import type { City } from "./Search";
import { useEffect, useState } from "react";

interface Forecast {
  time: string;
  temperature_2m: number | any;
  apparent_temperature: number;
  relative_humidity: number;
  is_day: number;
  weather_code: number;
}

interface WeatherResponse {
  current: Forecast;
  current_units: { temperature_2m: string };
}

interface WeatherCardProps {
  city: City;
}

const WeatherCard = ({ city }: WeatherCardProps) => {
  const [forecastData, setForecastData] = useState<WeatherResponse | null>(
    null,
  );

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,is_day,rain,apparent_temperature,relative_humidity_2m,weather_code&timezone=auto`,
        );
        const data: WeatherResponse = await response.json();
        setForecastData(data);
      } catch (err) {
        console.error("Conexão não estabelecida", err);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <>
      {/* Container principal do weather card */}
      <section className="fixed inset-0 -z-10 mt-10 h-screen w-screen flex justify-center items-center">
        {/* Container que cria o card e contém todos os itens dentro do card */}
        <div className="w-4/5 h-9/12 md:w-3/4 lg:w-1/2 p-6 md:p-8 flex flex-col justify-between border rounded-3xl shadow-xl backdrop-blur-md bg-white/20 border-white/30 text-white">
          <div className="grid grid-cols-2 gap-2 items-center font-bold text-2xl">
            <header className="flex justify-center col-span-2">
              <span>{forecastData?.current.time}</span>
            </header>

            <span className="flex justify-start items-center">
              <MapPinIcon size={24} weight="fill" />
              <p>{city.name}</p>
            </span>

            <span className="flex justify-end items-center">
              <p>30°/24°</p>
            </span>
          </div>

          <div className="flex flex-col justify-centers items-center text-2xl">
            <CloudSunIcon size={64} weight="fill" />
            {Math.ceil(forecastData?.current.temperature_2m)}
          </div>

          {/* <div className="flex justify-between text-xs md:text-xl">
            <span className="flex flex-col items-center">
              <p>Seg</p>
              <CloudSunIcon size={28} />
              <p>35°/25°</p>
            </span>
            <span className="flex flex-col items-center">
              <p>Seg</p>
              <CloudSunIcon size={28} />
              <p>35°/25°</p>
            </span>
            <span className="flex flex-col items-center">
              <p>Seg</p>
              <CloudSunIcon size={28} />
              <p>35°/25°</p>
            </span>
            <span className="flex flex-col items-center">
              <p>Seg</p>
              <CloudSunIcon size={28} />
              <p>35°/25°</p>
            </span>
            <span className="flex flex-col items-center">
              <p>Seg</p>
              <CloudSunIcon size={28} />
              <p>35°/25°</p>
            </span>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default WeatherCard;
