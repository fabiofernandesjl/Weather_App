import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

const Search = () => {
  useEffect(() => {
    const testConnectionApi = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=pt&format=json",
        );
        const data = await response.json();
        console.log("Teste de Conexão", data);
      } catch (err) {
        console.error("Conexão não estabelecida", err);
      }
    };

    testConnectionApi();
  }, []); // O "[]" garante que a chamada para a Api só irá acontecer uma vez quando o programa se inicia

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
          />
        </div>
      </header>

      {/* Container dropdown para as sugestões de autocomplete das cidades */}
      <div className="absolute"></div>
    </>
  );
};

export default Search;
