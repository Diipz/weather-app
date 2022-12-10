const searchBtn = document.querySelector("#search-icon");


async function getCoordinates() {
    try {
        const location = "london"//document.querySelector("input").value;
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=c1549ca689f583a53da882e62424c483`, { mode: "cors" });
        locationCoords = await response.json();
        return locationCoords;
    } catch (error) {
        alert("Unknown location");
    }
}

async function getWeatherData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationCoords[0].lat}&lon=${locationCoords[0].lon}&appid=c1549ca689f583a53da882e62424c483`, { mode: "cors" });
        weatherData = await response.json();
        return weatherData;
    } catch (error) {
        alert(error);
    }
}

function createWeatherCard() {
    let temp = document.querySelector("#result-temp");
    let place = document.querySelector("#result-place");
    let weather = document.querySelector("#result-weather");
    let description = document.querySelector("#result-weather-desc");
    let feelsLike = document.querySelector("#result-feeling");
    let humidity = document.querySelector("#result-humidty");
    let pressure = document.querySelector("#result-pressure");
    let minTemp = document.querySelector("#result-min-temp");
    let maxTemp = document.querySelector("#result-max-temp");

    temp.textContent = Math.round((weatherData.main.temp - 273.15) * 10) / 10 + "\u00B0";
    place.textContent = weatherData.name;
    weather.textContent = weatherData.weather[0].main;
    description.textContent = weatherData.weather[0].description;
    feelsLike.textContent = Math.round((weatherData.main.feels_like - 273.15) * 10) / 10 + "\u00B0";
    humidity.textContent = weatherData.main.humidity + "%";
    pressure.textContent = weatherData.main.pressure + "mb";
    minTemp.textContent = Math.round((weatherData.main.temp_min - 273.15) * 10) / 10 + "\u00B0";
    maxTemp.textContent = Math.round((weatherData.main.temp_max - 273.15) * 10 / 10) + "\u00B0";

}

