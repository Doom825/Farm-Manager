import dotenv from 'dotenv';
import dayjs, {type Dayjs} from 'dayjs';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  cityName: string;
  date: Dayjs | string;

  constructor( temperature:number, description:string, humidity:number, windSpeed:number, cityName:string, date:Dayjs |string ) {
    this.temperature=temperature;
    this.description=description;
    this.humidity=humidity;
    this.windSpeed=windSpeed;
    this.cityName=cityName;
    this.date=dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  city: string;

  constructor() {
    this.city ='';
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';

  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string):Promise<Coordinates[]> {
    try {
      const response: Coordinates[] = await fetch(query).then((res) => res.json());
      return response;
    } catch (err) {
      console.log('Error:',err);
      throw err;
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates[]): Coordinates {
    return {
      name: locationData[0].name,
      state: locationData[0].state,
      country: locationData[0].country,
      lat: locationData[0].lat,
      lon: locationData[0].lon
    };

  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData():Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return await response.json();
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    return new Weather(
  response.main.temp,
  response.weather.description,
  response.main.humidity ,
  response.wind.windSpeed,
  response.city.name ,
  response.dt,
    )
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map(data => {
      const forecastDate = dayjs(data.dt_txt || data.date); // support both common formats
      const currentDate = dayjs(currentWeather.date);
  
      const isSameAsCurrent = forecastDate.isSame(currentDate, 'minute');
  
      return new Weather(
        data.main.temp,
        data.weather[0].description + (isSameAsCurrent ? " (Current)" : ""),
        data.main.humidity,
        data.wind.speed,
        data.city?.name || currentWeather.cityName, // fallback to currentWeather's city
        forecastDate.format("YYYY-MM-DD HH:mm"), // normalize the date format
      );
    });
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherResponce = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherResponce);
    const forecastArray = this.buildForecastArray(currentWeather, weatherResponce.forecast || []);
    return { current: currentWeather, forecast: forecastArray };
  }
}

export default new WeatherService();
