import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "@/components/weatherCard";
import { Loader2 } from "lucide-react";
import {WeatherData} from '@/types/weather'

// Define the WeatherData type
const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const apiKey = "b729c5ac7ddfe70e6d7b9e8f3c82cd03";

  const fetchWeather = (city: string) => {
    setLoading(true);
    setIsError(false);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
        setLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setLoading(false);
        setIsError(true);
      });
  };

  const handleSearch = () => {
    fetchWeather(city as string);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">How&apos;s the weather today?</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
          className="border-2 p-2 flex-grow rounded-lg"
          placeholder="Enter city name"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-slate-800 text-white rounded"
        >
          Get Weather
        </button>
      </div>
      {isError && (
        <div className="text-red-500">
          Something went wrong, please try entering the correct city name.
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : (
        weatherData &&
        !isError && (
          <WeatherCard
            city={weatherData.name}
            country={weatherData.sys.country}
            icon={weatherData.weather[0].icon}
            temperature={weatherData.main.temp}
            feelsLike={weatherData.main.feels_like}
            humidity={weatherData.main.humidity}
            windSpeed={weatherData.wind.speed}
            sunrise={new Date(
              weatherData.sys.sunrise * 1000
            ).toLocaleTimeString()}
            sunset={new Date(
              weatherData.sys.sunset * 1000
            ).toLocaleTimeString()}
            description={weatherData.weather[0].description}
          />
        )
      )}
    </div>
  );
};

export default Weather;
