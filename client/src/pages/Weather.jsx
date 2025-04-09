import React, { useEffect, useState } from "react";
import { getByCity } from "../API/weatherAPI";
//after form for weather is done useeffect needs to be removed
export default function Weather() {
    const [weather, setWeather] = useState({})
    const [city, setCity] = useState('')
    
    const fetchWeather = async (e) => {
        e.preventDefault();
        if (city.trim() === '') return;

        try {
            const weatherData = await getByCity(city);
            setWeather(weatherData);
        } catch (error) {
            console.error('Cant fetch weather data:',error);
            alert('Cant fetch weather data');
        }
    };
//conversions
    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };

    const metersToMph = (mps) => {
        return (mps * 2.237).toFixed(2);
    };
//form submit
const handleCityChange = (e) => {
    setCity(e.target.value);
};


//page info
    return (
        <div>
            <form onSubmit={fetchWeather}>
                <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Enter a city"
                    />
                    <button type="submit">Get Weather</button>
            </form>
            <h2>{weather?.name}</h2>
            <h3>
                {weather?.main?.temp
                    ? celsiusToFahrenheit(weather.main.temp).toFixed(2) + ' °F'
                    : 'Temperature not available'}
            </h3>

            <h2>
                {weather?.wind?.speed
                    ? `${metersToMph(weather.wind.speed)} mph`
                    : 'Wind speed not availiable'
                }
            </h2>
            <h2>{weather?.weather?.[0]?.description}</h2>
        </div>
    );
}