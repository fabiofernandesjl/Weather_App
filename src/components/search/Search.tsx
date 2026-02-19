import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const Search = () => {
  return (
    <>
      <header className="w-screen p-4 flex justify-center">
        <div className="w-4/5 py-1 px-3 flex items-center gap-1 border-2 rounded-2xl lg:w-4xl">
          <MagnifyingGlassIcon size={20} className="" />
          <input
            type="text"
            placeholder="Digite o nome da cidade..."
            className="w-4/5 focus:outline-none focus:ring-0"
          />
        </div>
      </header>
    </>
  );
};

export default Search;
