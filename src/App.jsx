import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeLocation from './components/TimeLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';
import weatherData from './services/Weather';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [bg, setBg] = useState('bg-ourcol-800');
  const [query, setQuery] = useState({ q: 'Bhopal' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState('');

  const getWeather = async () => {
    const msg = query.q ? query.q : 'Current Location';
    toast.info(`Fetching Data for ${msg.charAt(0).toUpperCase() + msg.slice(1)}`);

    await weatherData({ ...query, units }).then((data) => {
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  useEffect(() => {
    if (weather && weather.id) {
      const bgClass = changingBg(weather.id);
      console.log('Weather ID:', weather.id); // Debug: Log the weather ID
      console.log('Background Class:', bgClass); // Debug: Log the background class
      setBg(bgClass);
    }
  }, [weather]);

  const changingBg = (x) => {
    switch (true) {
      case x >= 200 && x < 300:
        return 'bg-ourcol-200';
      case x >= 300 && x < 500:
        return 'bg-ourcol-300';
      case x >= 500 && x < 600:
        return 'bg-ourcol-500';
      case x >= 600 && x < 700:
        return 'bg-ourcol-600';
      case x >= 700 && x < 800:
        return 'bg-ourcol-700';
      case x === 800:
        return 'bg-ourcol-800';
      case x > 800:
        return 'bg-ourcol-801';
      default:
        return 'bg-ourcol-800';
    }
  };

  return (
    <>
      <div className={`${bg} min-h-screen`}>
        <div className="mx-auto max-w-screen-lg text-lg py-6">
          <TopButtons setQuery={setQuery} />
          <Inputs setQuery={setQuery} setUnits={setUnits} />
          {weather && (
            <div>
              <TimeLocation weather={weather} />
              <TempDetails weather={weather} units={units} />
              <Forecast title="3 hour step forecast" data={weather.hourly} />
              <Forecast title="daily forecast" data={weather.daily} />
            </div>
          )}
          <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
        </div>
      </div>
    </>
  );
}

export default App;
