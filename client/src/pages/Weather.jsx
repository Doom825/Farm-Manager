import React, { useEffect, useState } from "react";
import { getByCity } from "../API/weatherAPI";
//after form for weather is done useeffect needs to be removed
export default function Weather() {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        (async () => {
            const weatherData = await getByCity('kansas city')
            setWeather(weatherData)
        })()

    }, [])
    console.log(weather)

    const celsiusToFahrenheit = (celsius) => {
        return (celsius * 9) / 5 + 32;
    };

    const metersToMph = (mps) => {
        return (mps * 2.237).toFixed(2);
    };


    return (
        <div>
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