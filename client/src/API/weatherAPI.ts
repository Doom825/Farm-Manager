export async function getByCity(city:string) {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=14e2d225416447b143bff6a87df9efbf&units=metric`;
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    return data;
}

