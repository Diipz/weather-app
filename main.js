const searchBtn = document.querySelector("#search-icon");
const temp = document.querySelector("#result-temp");
const place = document.querySelector("#result-place");
const weather = document.querySelector("#result-weather");
const description = document.querySelector("#result-weather-desc");
const feelsLike = document.querySelector("#result-feeling");
const humidity = document.querySelector("#result-humidty");
const pressure = document.querySelector("#result-pressure");
const minTemp = document.querySelector("#result-min-temp");
const maxTemp = document.querySelector("#result-max-temp");
const convertUnitsBtn = document.querySelector("#convert-units-btn");


searchBtn.addEventListener("click", () => {

    let city = document.getElementById("location").value;

    if (city !== "") {
        getWeatherData(city);
        setTimeout(function () {
            let content = document.querySelector(".content");
            content.style.display = "none";
            let results = document.querySelector(".result-screen");
            results.style.display = "block";
        }, 1000)

    } else {
        return alert("select a city");
    }
})

convertUnitsBtn.addEventListener("click", () => {
    convertUnitsBtn.classList.toggle("celsius");

    if (convertUnitsBtn.classList.contains("celsius")) {
        let newTemp = convertCelsiusToFahrenheit(temp.textContent);
        temp.textContent = newTemp;
        let newFeelTemp = convertCelsiusToFahrenheit(feelsLike.textContent);
        feelsLike.textContent = newFeelTemp;
        let newMinTemp = convertCelsiusToFahrenheit(minTemp.textContent);
        minTemp.textContent = newMinTemp;
        let newMaxTemp = convertCelsiusToFahrenheit(maxTemp.textContent);
        maxTemp.textContent = newMaxTemp;
    } else {
        let newTemp = convertFahrenheitToCelsius(temp.textContent);
        temp.textContent = newTemp;
        let newFeelTemp = convertFahrenheitToCelsius(feelsLike.textContent);
        feelsLike.textContent = newFeelTemp;
        let newMinTemp = convertFahrenheitToCelsius(minTemp.textContent);
        minTemp.textContent = newMinTemp;
        let newMaxTemp = convertFahrenheitToCelsius(maxTemp.textContent);
        maxTemp.textContent = newMaxTemp;
    }

})


//async function to obtain weather data of city
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1549ca689f583a53da882e62424c483&units=metric`, { mode: "cors" });
        data = await response.json();
        createWeatherCard(data);
        return;

    } catch (error) {
        alert("Unable find location");
    }
}

//display weather card using weather data
function createWeatherCard(weatherData) {

    temp.textContent = Math.round(weatherData.main.temp * 10) / 10;
    place.textContent = weatherData.name;
    weather.textContent = weatherData.weather[0].main;
    description.textContent = weatherData.weather[0].description;
    feelsLike.textContent = Math.round(weatherData.main.feels_like * 10) / 10;
    humidity.textContent = weatherData.main.humidity + "%";
    pressure.textContent = weatherData.main.pressure + "mb";
    minTemp.textContent = Math.round(weatherData.main.temp_min * 10) / 10;
    maxTemp.textContent = Math.round(weatherData.main.temp_max * 10) / 10;
}

function convertCelsiusToFahrenheit(value) {
    return Math.round((Number(value) * 9 / 5 + 32) * 10) / 10;

}

function convertFahrenheitToCelsius(value) {
    return Math.round((Number(value) - 32) * (5 / 9) * 10) / 10;

}


