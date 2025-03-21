let apiKey = import.meta.env.VITE_API_KEY;

function GetWeatherData({ city, setData }) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => setData(result));
}

export { GetWeatherData };
