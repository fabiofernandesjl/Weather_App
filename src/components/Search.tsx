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
    admin1?: string; //(Estado) Caso a cidade tenha
  }

  //interface para separar os obejcts das cidades que vem dentro de um array result.
  interface GeocodingResponse {
    results?: City[] | any;
  }

  const [city, setCity] = useState<string>(""); // Estado que vai armazenar o nome da cidade que o usuário digitar na searchBar.
  const [suggestions, setSuggestions] = useState<any>([]); // Estado que vai armazenar os dados retornados pela api.
  const [showDroppdown, setShowDroppdown] = useState<boolean>(false); // Estado para informar ao código quando mostrar o droppdown de sugestões.

  // useEffect permite que toda a ação que estiver dentro dele seja executada
  // apenas com uma condição ou mudança definida.
  useEffect(() => {
    // Cria um timer que vai fazer a chamada da api somente depois que o tempo definido terminar.
    const timer = setTimeout(() => {
      if (city.length > 2) {
        //Chama a função fetchCity para fazer o pedido da cidade que o usuário digitou na api caso a condição
        //de que a varável city seja não esteja vazia seja verdadeira.
        fetchCity(city);
      } else {
        setSuggestions([]);
      }
    }, 1000); //Esse trecho de código só executa depois de 1 segundo após a ação.

    return () => {
      // Reinicia o timer para ser iniciado novamente assim que o usuário digitar de novo.
      clearTimeout(timer);
    };
  }, [city]); // O "[city]" garante que a chamada para a Api só irá acontecer quando a váriavel city mudar.

  // Conexão com a api para busca das cidades.
  const fetchCity = async (city: String): Promise<City[] | any> => {
    try {
      // Variável que armazena a conexão da api.
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=pt`,
      );
      const data: GeocodingResponse = await response.json(); // Variável que recebe os dados da api.
      setSuggestions(data.results || []); // Atualiza a variável de sugestões com os dados da api.
      setShowDroppdown(true); // Altera o valor para true, para mostrar as sugestões.
    } catch (err) {
      console.error("Conexão não estabelecida", err); // Para caso tenha algum erro na conexão com a api será mostrado a mensagem no console.
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
            //Função que vai armazenar o que o usuário digitar dentro do input na variável city.
            onChange={
              (e: React.ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value) //Pega o valor do input e armazena em city
            }
          />
        </div>
      </header>

      {/* Droppdown de sugestões de cidades trazidos da api baseado no que o usuário digitou */}
      {showDroppdown && suggestions.length > 0 && (
        <div className="flex justify-center items-center">
          <div className="w-4/5 lg:w-4xl md:text-xl font-bold px-2 py-2 flex flex-col gap-2 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 border-white/30 text-white">
            <ul>
              {/* Faz um map para selecionar cada cidade do array de resultados da api */}
              {suggestions.map((item: any) => (
                <li
                  className="hover:bg-white/30 cursor-pointer p-1 pl-2 rounded-xl"
                  key={item.id} //Key de identificação baseado no id da cidade para cada item.
                >
                  {item.name}, {item.admin1}, {item.country}
                  {/* Exemplo: Belo Horizonte, Minas Gerais, Brasil */}
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
