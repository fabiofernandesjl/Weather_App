import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudMoonIcon,
  CloudRainIcon,
  CloudSunIcon,
  MapPinIcon,
  MoonIcon,
  SunIcon,
} from "@phosphor-icons/react";
import type { City } from "./Search";
import { useEffect, useState } from "react";

interface ForecastCurrent {
  time: string;
  temperature_2m: number | any;
  apparent_temperature: number;
  relative_humidity: number;
  is_day: number;
  weather_code: number;
}

interface ForecastDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

interface WeatherResponse {
  current: ForecastCurrent;
  daily: ForecastDaily;
  current_units: { temperature_2m: string };
}

interface WeatherCardProps {
  city: City;
}

const WeatherCard = ({ city }: WeatherCardProps) => {
  const [forecastData, setForecastData] = useState<WeatherResponse | null>(
    null,
  );

  const getWeatherIcon = (code: number, isDay: number, size = 24) => {
    const icons: Record<number, React.ReactNode> = {
      0: isDay === 1 ? <SunIcon size={size} /> : <MoonIcon size={size} />,
      1:
        isDay === 1 ? (
          <CloudSunIcon size={size} />
        ) : (
          <CloudMoonIcon size={size} />
        ),
      2: <CloudIcon size={size} />,
      3: <CloudIcon size={size} />,
      45: <CloudFogIcon size={size} />,
      48: <CloudFogIcon size={size} />,
      51: <CloudRainIcon size={size} />,
      53: <CloudRainIcon size={size} />,
      55: <CloudRainIcon size={size} />,
      61: <CloudRainIcon size={size} weight="fill" />,
      63: <CloudRainIcon size={size} weight="fill" />,
      65: <CloudRainIcon size={size} weight="fill" />,
      95: <CloudLightningIcon size={size} />,
      96: <CloudLightningIcon size={size} />,
      99: <CloudLightningIcon size={size} />,
    };
    return icons[code] || <CloudIcon size={size} />;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,is_day,rain,apparent_temperature,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
        );
        const data: WeatherResponse = await response.json();
        setForecastData(data);
      } catch (err) {
        console.error("Conexão não estabelecida", err);
      }
    };

    fetchWeather();
  }, [city]);

  // Enquanto os dados não chegam, podemos exibir um estado de carregamento ou nada
  if (!forecastData) {
    return null;
  }

  const dateFormatPt = (date: string) => {
    const [year, month, day] = date.split("-").map(Number);

    const formattedDate = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
    }).format(formattedDate);
  };

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

            <span className="flex justify-start items-center text-xl">
              <MapPinIcon size={24} weight="fill" />
              <p>{city.name}</p>
            </span>

            <span className="flex justify-end items-center">
              {/* <p>30°/24°</p> */}
              {/* Exemplo de exibição da sensação térmica */}
              <p>
                {Math.ceil(forecastData.current.apparent_temperature)}
                {forecastData.current_units.temperature_2m}
              </p>
            </span>
          </div>

          <div className="flex flex-col justify-centers items-center text-2xl">
            {/* <CloudSunIcon size={64} weight="fill" /> */}
            {getWeatherIcon(
              forecastData.current.weather_code,
              forecastData.current.is_day,
              64,
            )}
            {Math.ceil(forecastData?.current.temperature_2m)}
            {forecastData?.current_units.temperature_2m}
          </div>

          <div className="flex justify-between text-xs md:text-sm">
            {forecastData.daily.time.map((item: string, index: number) => {
              if (index < 4) {
                return (
                  <span className="flex flex-col items-center">
                    <p>{dateFormatPt(item)}</p>
                    <div />{" "}
                    {getWeatherIcon(
                      forecastData.daily.weather_code[index],
                      1,
                      24,
                    )}{" "}
                    <div />
                    <p>
                      {Math.round(forecastData.daily.temperature_2m_max[index])}
                      {forecastData.current_units.temperature_2m} /{" "}
                      {Math.round(forecastData.daily.temperature_2m_min[index])}
                      {forecastData.current_units.temperature_2m}
                    </p>
                  </span>
                );
              } else if (index < 5) {
                return (
                  <span className="hidden md:flex flex-col items-center">
                    <p>{dateFormatPt(item)}</p>
                    <div />{" "}
                    {getWeatherIcon(
                      forecastData.daily.weather_code[index],
                      1,
                      24,
                    )}{" "}
                    <div />
                    <p>
                      {Math.round(forecastData.daily.temperature_2m_max[index])}
                      {forecastData.current_units.temperature_2m} /{" "}
                      {Math.round(forecastData.daily.temperature_2m_min[index])}
                      {forecastData.current_units.temperature_2m}
                    </p>
                  </span>
                );
              } else {
                return (
                  <span className="hidden lg:flex flex-col items-center">
                    <p>{dateFormatPt(item)}</p>
                    <div />{" "}
                    {getWeatherIcon(
                      forecastData.daily.weather_code[index],
                      1,
                      24,
                    )}{" "}
                    <div />
                    <p>
                      {Math.round(forecastData.daily.temperature_2m_max[index])}
                      {forecastData.current_units.temperature_2m} /{" "}
                      {Math.round(forecastData.daily.temperature_2m_min[index])}
                      {forecastData.current_units.temperature_2m}
                    </p>
                  </span>
                );
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default WeatherCard;
