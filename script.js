async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const weatherBox = document.getElementById('weatherInfo');
  const apiKey = "282296435515b2053adabe339a9bb71f"; // Replace with your actual API key

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`
    );

    const data = await response.json();

    if (data.error) {
      weatherBox.innerHTML = `<p style="color: red;">${data.error.info}</p>`;
      weatherBox.style.display = "block";
      return;
    }

    const { current, location } = data;

    weatherBox.innerHTML = `
      <h2>${location.name}, ${location.country}</h2>
      <img src="${current.weather_icons[0]}" alt="${current.weather_descriptions[0]}">
      <p>🌡️ Temperature: ${current.temperature}°C</p>
      <p>☁️ Condition: ${current.weather_descriptions[0]}</p>
      <p>💨 Wind: ${current.wind_speed} km/h</p>
      <p>💧 Humidity: ${current.humidity}%</p>
      <p>🕒 Local Time: ${location.localtime}</p>
    `;
    weatherBox.style.display = "block";
  } catch (error) {
    weatherBox.innerHTML = `<p style="color: red;">Failed to fetch data. Please try again.</p>`;
    weatherBox.style.display = "block";
  }
}
