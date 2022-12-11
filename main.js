let searchBtn = document.querySelector("#search-icon");



searchBtn.addEventListener("click", () => {

    let city = document.getElementById("location").value;


    if (city !== "") {
        getWeatherData(city);
        setTimeout(function () {
            let content = document.querySelector(".content");
            content.style.display = "none";
            let results = document.querySelector(".result-screen");
            results.style.display = "block";
        }, 2000)

    } else {
        return alert("select a city");
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
        alert(error);
    }
}

//display weather card using weather data
function createWeatherCard(weatherData) {
    let temp = document.querySelector("#result-temp");
    let place = document.querySelector("#result-place");
    let weather = document.querySelector("#result-weather");
    let description = document.querySelector("#result-weather-desc");
    let feelsLike = document.querySelector("#result-feeling");
    let humidity = document.querySelector("#result-humidty");
    let pressure = document.querySelector("#result-pressure");
    let minTemp = document.querySelector("#result-min-temp");
    let maxTemp = document.querySelector("#result-max-temp");

    temp.textContent = Math.round(weatherData.main.temp * 10) / 10 + "\u00B0";
    place.textContent = weatherData.name;
    weather.textContent = weatherData.weather[0].main;
    description.textContent = weatherData.weather[0].description;
    feelsLike.textContent = Math.round(weatherData.main.feels_like * 10) / 10 + "\u00B0";
    humidity.textContent = weatherData.main.humidity + "%";
    pressure.textContent = weatherData.main.pressure + "mb";
    minTemp.textContent = Math.round(weatherData.main.temp_min * 10) / 10 + "\u00B0";
    maxTemp.textContent = Math.round(weatherData.main.temp_max * 10 / 10) + "\u00B0";
}



