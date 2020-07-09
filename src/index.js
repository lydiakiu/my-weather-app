//challenge 1: day and time

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
let current = new Date();
document.querySelector("h2").innerHTML = formatDate(current);

//challenge 3 : interchange celcius and fahrenheit
function changeFah() {
  let showDegree = document.querySelector("#degree");
  showDegree.innerHTML = `61°F`;
}
let celcius = document.querySelector("#fah-cel");
celcius.addEventListener("click", changeFah);

function changeCel() {
  let showDegree = document.querySelector("#degree");
  showDegree.innerHTML = `16°C`;
}
let fahrenheit = document.querySelector("#cel-fah");
fahrenheit.addEventListener("click", changeCel);
document.querySelector("#city-input").value;

//HW week 5 : change city name display temp
function displayWeather(response) {
  document.querySelector("#show-city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h3").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
}
function loadSearch(city) {
  let apiKey = "8aaa27a8220932bbfcccd9f6036dc58b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  loadSearch(city);
}

function searchLocation(position) {
  let apiKey = "8aaa27a8220932bbfcccd9f6036dc58b";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(locationUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

let myLocation = document.querySelector("#location");
myLocation.addEventListener("click", getLocation);

loadSearch("Lisbon");
