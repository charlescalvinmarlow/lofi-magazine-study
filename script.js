const batteryRangeSlider = document.querySelector("#battery_percent");
const batteryValueDisplay = document.querySelector(".battery_value");

const timezone = document.getElementById("timezone")

batteryValueDisplay.textContent = batteryRangeSlider.value;

// batteryRangeSlider.oninput = function() {
//     batteryValueDisplay.innerHTML = this.value;
//     document.getElementById('batteryBackground').style.height = (100-this.value) + '%';
// };

function setBatteryLevel() {
    batteryValueDisplay.innerHTML = batteryRangeSlider.value;
    document.getElementById('batteryBackground').style.height = (100-batteryRangeSlider.value) + '%';
};

setBatteryLevel();
batteryRangeSlider.oninput = setBatteryLevel;

//get local time (based on user's system clock)
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    timezone.textContent = timeString
}

//run the update clock every one second
setInterval(updateClock, 1000)
//run update clock to intitiate it so the html isn't empty
updateClock();


//access weather info
//array ofweather code strings
const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};
async function fetchWeather() {
    const lat = -33.8688;
    const lon = 151.2093;
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-33.8688&longitude=151.2093&current=temperature_2m,weather_code';
console.log("running")
    try {
        //await pauses execution until its promise is settled
        
        const response = await fetch(url);
        const data = await response.json();

        //collect info from api
        const temp = data.current.temperature_2m;
        const wCode = data.current.weather_code;
        
        //convert wCode into string description
        const wDescription = weatherCodes[wCode] || "Condition unkown";

        //insert data into html
        document.getElementById("localTemp").textContent = temp + "°C";
        document.getElementById("localWeather").textContent = wDescription;
    } catch (err) {
        console.error("Failed to fetch weather", err)
    }

}

fetchWeather();