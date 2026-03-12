import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";

const Search = () => {
  interface geocodingData {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
  }

  const [city, setCity] = useState<string>("");
  const [suggestions, setSuggestions] = useState([]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (city.length > 2) {
  //       // fetchCity(city);
  //       console.log("Váriavel alterada");
  //     } else {
  //       setSuggestions([]);
  //     }
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [city]); // O "[]" garante que a chamada para a Api só irá acontecer uma vez quando o programa se inicia

  // const fetchCity = async (city: String): Promise<void> => {
  //   try {
  //     const response = await fetch(
  //       `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=pt`,
  //     );
  //     const data = await response.json();
  //     console.log("Teste de Conexão", data);
  //   } catch (err) {
  //     console.error("Conexão não estabelecida", err);
  //   }
  // };

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

      {/* Container dropdown para as sugestões de autocomplete das cidades */}
      <div className="flex justify-center items-center">
        <div className="w-4/5 lg:w-4xl md:text-xl font-bold px-2 py-2 flex flex-col gap-2 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 border-white/30 text-white">
          <div className="hover:bg-white/30 cursor-pointer p-1 pl-2 rounded-xl">
            São Paulo, Brasil
          </div>
          <div className="hover:bg-white/30 cursor-pointer p-1 pl-2 rounded-xl">
            São Paulo, Brasil
          </div>
          <div className="hover:bg-white/30 cursor-pointer p-1 pl-2 rounded-xl">
            São Paulo, Brasil
          </div>
          <div className="hover:bg-white/30 cursor-pointer p-1 pl-2 rounded-xl">
            São Paulo, Brasil
          </div>
          <div className="hover:bg-white/30 cursor-pointer p-1 pl-2 rounded-xl">
            São Paulo, Brasil
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
