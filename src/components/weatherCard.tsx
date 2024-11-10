"use client";
import React from "react";

interface weatherProps {
  city: string;
  country: string;
  icon: string;
  temperature: string;
  feelsLike: string;
  humidity: string;
  windSpeed: string;
  sunrise: string;
  sunset: string;
  description: string;
}

const Weather = ({
  city,
  country,
  icon,
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  sunrise,
  sunset,
  description,
}: weatherProps) => {
  return (
    <div
      className="bg-white rounded-xl 
        shadow-md overflow-hidden border-2 flex justify-center p-8"
    >
      <div className="">
        <div className="flex justify-center">
          <div className="text-sm font-bold text-center">
            <span className="text-2xl">
              {city}, {country}
            </span>
            {description && <p className="text-gray-500 mt-2">{description}</p>}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt="Weather icon"
          />
        </div>
        <div className="p-8">
          <div className="flex">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 w-44 text-center">
              <h2 className="text-lg font-semibold mb-2">
                {temperature} &deg;C
              </h2>
              <p className="text-gray-500">Current Temperature</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 m-4 w-44">
              <h2 className="text-lg font-semibold mb-2">{feelsLike} &deg;C</h2>
              <p className="text-gray-500">Feels Like</p>
            </div>
          </div>
          <div className="flex">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 w-44 text-center">
              <h2 className="text-lg font-semibold mb-2">{humidity} %</h2>
              <p className="text-gray-500">Humidity</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 m-4 w-44">
              <h2 className="text-lg font-semibold mb-2">{windSpeed} m/s</h2>
              <p className="text-gray-500">Wind Speed</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="mt-2 text-center">
              <span className="font-semibold">Sunrise:</span>
              <span className="mt-2 text-gray-500 text-center">{sunrise}</span>
            </div>
            <div className="mt-2 text-center">
              <span className="font-semibold">Sunset:</span>
              <span className="mt-2 text-gray-500 text-center">{sunset}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
