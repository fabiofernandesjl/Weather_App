import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col bg-linear-to-b from-sky-400 to-blue-600">
        <Search />
        <WeatherCard />
      </div>
    </>
  );
};

export default App;
