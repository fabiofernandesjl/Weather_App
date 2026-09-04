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
  WindIcon,
  DropIcon,
  ThermometerIcon,
} from "@phosphor-icons/react";
import type { City } from "./Search";
import { useEffect, useState } from "react";

//Interface para definir os dados que serão usados do Objeto Current, para dados principais de previsão do dia atual
interface ForecastCurrent {
  timezone: string | any;
  time: string;
  temperature_2m: number | any;
  apparent_temperature: number;
  relative_humidity_2m: number;
  is_day: number;
  wind_speed_10m: number | any;
  weather_code: number;
}

// Interface para definir os dados que serão usados do objeto Daily, para dados de previsão diária
interface ForecastDaily {
  // O índice de cada lista se correlaciona com o mesmo indice de qualquer outra lista
  // Por exemplo: O código de clima do indice 0 é o código da data de indice 0 também
  time: string[]; // Lista de datas
  weather_code: number[]; // Lista código do clima do dia relacionado a cada data do time
  temperature_2m_max: number[]; // Lista de temperatura máxima relacionado a cada data do time
  temperature_2m_min: number[]; // Lista de temperatura Mínina relacionado a cada data do time
}

// Interface que junta os dados das outras duas interfaces Current e Daily em uma apenas para facilidade do uso
interface WeatherResponse {
  current: ForecastCurrent;
  daily: ForecastDaily;
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
  };
}

interface WeatherCardProps {
  city: City;
}

// Função principal do weather card
const WeatherCard = ({ city }: WeatherCardProps) => {
  // Variável de estado para armazenar os dados da resposta da API
  const [forecastData, setForecastData] = useState<WeatherResponse | null>(
    null,
  );

  //Função para selecionar o icone certo de acordo com o weatherCode relacionado ao clima atual da cidade buscada
  const getWeatherIcon = (code: number, isDay: number, size = 24) => {
    // Criação de um objeto icons para vincular o icone com o código WeatherCode do clima retornado da api
    // Esse objeto foi definido com o utiliy type "Record" que define qual é o tipo de dado da chave e do valor da chave que o objeto deve seguir
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
    return icons[code] || <CloudIcon size={size} />; // Retorna o ícone relacionado ao código ou retorna o icone de nuvem caso não tenha o código.
  };

  // Função para conectar com a api que irá fazer a chamada apenas quando o valor de city alterar
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,is_day,rain,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`,
        );
        const data: WeatherResponse = await response.json();
        setForecastData(data);
      } catch (err) {
        console.error("Conexão não estabelecida", err);
      }
    };

    fetchWeather();
  }, [city]);

  // Enquanto os dados não chegam, podemos exibir um estado de carregamento ou nada.
  if (!forecastData) {
    return null;
  }

  // Função para foratação de data para mostrar apenas o dia da semana na lista de previsão diárias.
  const dateFormatPt = (date: string) => {
    const [year, month, day] = date.split("-").map(Number); // Divide a string da data em tres: dia, mês e ano.

    const formattedDate = new Date(year, month - 1, day); // Procura a data através de cada valor que foi separado.

    // Formata a data encontrada para o formato correto que vai mostrar na tela.
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
    }).format(formattedDate);
  };

  // Mesmo ação da função anterior
  const formattedDateHeader = new Date(
    forecastData?.current.time,
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    weekday: "long",
  });

  const currentTimeFormatted = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: forecastData.current.timezone,
  }).format(new Date());

  return (
    <>
      {/* Container principal do weather card */}
      <section className="fixed inset-0 -z-10 mt-10 h-screen w-screen flex justify-center items-center">
        {/* Container que cria o card e contém todos os itens dentro do card */}
        <div className="w-4/5 h-9/12 md:w-3/4 lg:w-1/2 p-6 md:p-8 flex flex-col justify-between border rounded-3xl shadow-xl backdrop-blur-md bg-white/20 border-white/30 text-white">
          <div className="grid grid-cols-2 gap-2 items-center font-bold text-2xl">
            <header className="flex flex-col justify-center items-center col-span-2">
              {/* Data do dia atual */}
              <span className="text-xl md:text-2xl">{`${formattedDateHeader.charAt(0).toUpperCase()}${formattedDateHeader.slice(1)}`}</span>
              <div>{currentTimeFormatted}</div>
            </header>

            <span className="flex justify-start items-center text-xl">
              <MapPinIcon size={24} weight="fill" />
              <p>{city.name}</p>
            </span>

            <span className="flex justify-end items-center">
              {/* <p>30°/24°</p> */}
              {/* Exemplo de exibição da sensação térmica */}
              <p className="flex flex-row items-center justify-center gap-2 text-xl">
                <ThermometerIcon size={24} />
                {Math.round(forecastData.daily.temperature_2m_max[0])}
                {forecastData.current_units.temperature_2m}
                {" / "}
                {Math.round(forecastData.daily.temperature_2m_min[0])}
                {forecastData.current_units.temperature_2m}
              </p>
            </span>
          </div>

          <div className="flex flex-col justify-centers items-center text-3xl font-bold">
            {/* Container principal para mostrar a temperatura atual e o icone relacionado ao clima atual */}
            {getWeatherIcon(
              forecastData.current.weather_code,
              forecastData.current.is_day,
              80,
            )}
            <span className="flex flex-row justify-center items-center gap-2">
              {Math.ceil(forecastData?.current.temperature_2m)}
              {forecastData?.current_units.temperature_2m}
            </span>
          </div>

          <div className="flex flex-row justify-center gap-8">
            <span className="flex flex-col justify-center items-center">
              <WindIcon size={32} />
              <p className="">
                {Math.round(forecastData?.current.wind_speed_10m)}{" "}
                {forecastData?.current_units.wind_speed_10m}
              </p>
            </span>

            <span>
              <DropIcon size={32} />
              <p>
                {forecastData?.current.relative_humidity_2m}
                {"%"}
              </p>
            </span>
          </div>

          <div className="flex justify-between text-xs md:text-sm">
            {/* Lista de previsão diária com uma condicional para saber quantos dias de previsão deveria mostrar de acordo com a largura da tela do usuário */}
            {forecastData.daily.time.map((item: string, index: number) => {
              if (index < 4) {
                return (
                  <span className="flex flex-col items-center">
                    <p>{dateFormatPt(item)}</p>{" "}
                    {/* Chamando a função que formata a string da data para mostrar na tela */}
                    <div />{" "}
                    {/* Função para selecionar o icone do clima da marcada */}
                    {getWeatherIcon(
                      forecastData.daily.weather_code[index],
                      1,
                      24,
                    )}{" "}
                    <div />
                    <p>
                      {/* Mostrar a temperatura minima e máxima */}
                      {Math.round(
                        forecastData.daily.temperature_2m_max[index],
                      )}{" "}
                      {/* Temperatura máxima */}
                      {forecastData.current_units.temperature_2m} /{" "}
                      {/* Simbolo de Celcius */}
                      {Math.round(
                        forecastData.daily.temperature_2m_min[index],
                      )}{" "}
                      {/* Temperatura mínima */}
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
