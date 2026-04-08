import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";

const Search = () => {
  //interface para tipar os dados necessários para serem usados na aplicação que a api irá retornar quando fizer a chamada.
  interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }

  //interface para separar os obejcts das cidades que vem dentro de um array result.
  interface GeocodingResponse {
    results?: City[] | any;
  }

  const [city, setCity] = useState<string>(""); // Variável que vai armazenar o nome da cidade que o usuário digitar na searchBar.
  const [suggestions, setSuggestions] = useState<any>([]); // Variável que vai armazenar os dados retornados pela api.
  const [showDroppdown, setShowDroppdown] = useState<boolean>(false);

  // useEffect permite que toda a ação que estiver dentro dele seja executada
  // apenas com uma condição ou mudança definida.
  useEffect(() => {
    // Cria um timer que vai fazer a chamada da api somente depois que o tempo definido terminar.
    const timer = setTimeout(() => {
      if (city.length > 2) {
        // fetchCity(city);
        fetchCity(city);
        console.log(suggestions);
      } else {
        setSuggestions([]);
      }
    }, 1000);

    return () => {
      // Reinicia o timer para ser iniciado novamente assim que o usuário digitar de novo
      clearTimeout(timer);
    };
  }, [city]); // O "[city]" garante que a chamada para a Api só irá acontecer quando a váriavel city mudar

  const fetchCity = async (city: String): Promise<City[] | any> => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=pt`,
      );
      const data: GeocodingResponse = await response.json();
      setSuggestions(data.results || []);
      setShowDroppdown(true);
    } catch (err) {
      console.error("Conexão não estabelecida", err);
    }
  };

  return (
    <>
      {/* Barra de busca para procurar a cidade desejadada pelo usuário */}
      <header className="w-screen p-4 flex justify-center">
        <div className="w-4/5 py-1 px-3 flex items-center gap-1 border-2 rounded-2xl lg:w-4xl bg-white">
          <MagnifyingGlassIcon size={20} className="" />
          <input
            type="text"
            placeholder="Digite o nome da cidade..."
            className="w-4/5 focus:outline-none focus:ring-0"
            value={city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCity(e.target.value)
            }
          />
        </div>
      </header>
      {showDroppdown && suggestions.length > 0 && (
        <div className="flex justify-center items-center">
          <div className="w-4/5 lg:w-4xl md:text-xl font-bold px-2 py-2 flex flex-col gap-2 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 border-white/30 text-white">
            <ul>
              {suggestions.map((item: any) => (
                <li
                  className="hover:bg-white/30 cursor-pointer p-1 pl-2 rounded-xl"
                  key={item.id}
                >
                  {item.name}, {item.admin1}, {item.country}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
