const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 1000);

var myDate = new Date();
var hrs = myDate.getHours();

var greet;
if (hrs < 12)
  greet = 'Good morning';
else if (hrs >= 12 && hrs <= 17)
  greet = 'Good afternoon';
else if (hrs >= 17 && hrs <= 24)
  greet = 'Good evening';

/**
 * Fetch weather data for a given city and update the UI
 * @param {string} city - The name of the city
 */
function fetchWeather(city = "Tongi,BD") {
  const key = '719d1c97dd98f1a4f06d87a13956cb2a';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      document.getElementById('weather').innerHTML = `${temp}°C`;
      const weathericon = data.weather[0].icon;
      document.getElementById('weathericon').src = `https://openweathermap.org/img/wn/${weathericon}@2x.png`;
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
    });
}

// Initial weather fetch
fetchWeather();

// Auto-refresh weather every 10 minutes (600,000 milliseconds)
setInterval(() => {
  fetchWeather();
}, 600000);

function livelyPropertyListener(name, val) {
  switch (name) {
    case "backgroundpicture":
      const bg = document.getElementById("background");
      bg.src = val;
      break;
    case "username":
      document.getElementById("welcome").innerText = "Good Day" + ", " + val;
      break;
    case "city":
      fetchWeather(val);
      break;
    case "font":
      const fontStylesheet = document.getElementById("fontstylesheet");
      if (val === 0) {
        fontStylesheet.href = "fonts/inter.css";
      } else if (val === 1) {
        fontStylesheet.href = "fonts/helveticaneue.css";
      } else if (val === 2) {
        fontStylesheet.href = "fonts/rubik.css";
      } else if (val === 3) {
        fontStylesheet.href = "fonts/productsans.css";
      }
      break;
  }
}
