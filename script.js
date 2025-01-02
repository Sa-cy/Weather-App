const apiKey = "ad65313ff863416b7bcfae1278f25f5e";
const apiLocationCity = "http://api.openweathermap.org/geo/1.0/direct?q=";
const apiWeatherLink = "https://api.openweathermap.org/data/2.5/weather?";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  //(1)get Latitude(north – south position) & Longitude(East-west position) for this city
  const responseLocation = await fetch(
    apiLocationCity + city + `&limit=5&appid=${apiKey}`
  );
  const info = await responseLocation.json();
  // console.log(info);

  //(2)get the weather for this city using the  Latitude & Longitude
  const responseWeather = await fetch(
    apiWeatherLink + `lat=${info[0].lat}&lon=${info[0].lon}&appid=${apiKey}`
  );
  const response = await responseWeather.json();
  console.log(response);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(
      ".city"
    ).innerHTML = `${response.name} - ${response.sys.country}`;
    document.querySelector(".temp").innerHTML =
      Math.round(response.main.temp - 273) + "°C";
    document.querySelector(".humidity").innerHTML =
      response.main.humidity + " %";
    document.querySelector(".wind").innerHTML = response.wind.speed + " km/h";

    if (response.weather[0].main == "Clouds") {
      weatherIcon.src = "img/clouds.png";
    } else if (response.weather[0].main == "Clear") {
      weatherIcon.src = "img/clear.png";
    } else if (response.weather[0].main == "Rain") {
      weatherIcon.src = "img/rain.png";
    } else if (response.weather[0].main == "Drizzle") {
      weatherIcon.src = "img/drizzle.png";
    } else if (response.weather[0].main == "Mist") {
      weatherIcon.src = "img/mist.png";
    } else if (response.weather[0].main == "snow") {
      weatherIcon.src = "img/snow.png";
    } else if (response.weather[0].main == "wind") {
      weatherIcon.src = "img/wind.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
});
getWeather();
