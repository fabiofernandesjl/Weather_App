import { CloudSunIcon, MapPinIcon } from "@phosphor-icons/react";

const WeatherCard = () => {
  return (
    <>
      {/* Container principal do weather card */}
      <section className="h-screen w-screen flex justify-center items-center">
        {/* Container que cria o card e contém todos os itens dentro do card */}
        <div className="w-4/5 h-9/12 md:w-3/4 lg:w-1/2 p-6 md:p-8 flex flex-col justify-between border rounded-3xl shadow-xl backdrop-blur-md bg-white/20 border-white/30 text-white">
          <div className="grid grid-cols-2 gap-2 items-center font-bold text-2xl">
            <header className="flex justify-center col-span-2">
              <span>28 de Fevereiro</span>
            </header>

            <span className="flex justify-start items-center">
              <MapPinIcon size={28} weight="fill" />
              <p>Eunápolis</p>
            </span>

            <span className="flex justify-end items-center">
              <p>30°/24°</p>
            </span>
          </div>

          <div className="flex flex-col justify-centers items-center text-2xl">
            <CloudSunIcon size={64} weight="fill" />
            35°
          </div>

          <div className="flex justify-between text-xs md:text-xl">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default WeatherCard;
