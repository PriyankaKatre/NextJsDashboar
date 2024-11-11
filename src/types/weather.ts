interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: string;
  feels_like: string;
  temp_min: string;
  temp_max: string;
  pressure: string;
  humidity: string;
}

interface Wind {
  speed: string;
  deg: string;
}

interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  name: string;
  weather: Weather[];
  main: Main;
  wind: Wind;
  sys: Sys;
}
