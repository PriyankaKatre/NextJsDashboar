"use client";

import Weather from "@/components/weather";
import News from "@/components/news";

const WeatherNews = () => {
    return (
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
                <Weather />
            </div>
            <div className="col-span-8">
                <News />
            </div>
        </div>
    </main>
  );
};

export default WeatherNews;
