import React, { useEffect, useState } from "react";
import { getByCity } from "../API/weatherAPI";

export default function Weather() {
    const [weather, setWeather] = useState({})
    useEffect(() => {
        (async () => {
            const weatherData = await getByCity('miami')
            setWeather(weatherData)
        })()

    }, [])
    console.log(weather)
    return (
        <div>
            <h2>{weather?.name}</h2>
        </div>
    );
}