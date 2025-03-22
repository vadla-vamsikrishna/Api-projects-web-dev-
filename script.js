async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  const apiKey = "5f16f871cfa9d0fa6804f6c10eea343b"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById("weather-info").innerText = "City not found!";
      return;
    }

    const weatherCondition = data.weather[0].main;
    const temperature = data.main.temp;
    const weatherText = ` ${temperature}°C, ${weatherCondition}`;
    document.getElementById("weather-info").innerText = weatherText;
    document.getElementById('humidity').innerHTML = ` Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').innerHTML = ` Wind Speed: ${data.wind.speed} km/h`;

    // Load images
    loadWeatherimages(weatherCondition);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function loadWeatherimages(weather) {
  let imagesPath = "";

  if (weather === "Rain") {
    imagesPath = "./images/rainy-day.png";
    backgroundUrl = "images/rainy-bg.jpg";
  } else if (weather === "Clouds") {
    imagesPath = "./images/cloudy.png";
    backgroundUrl = "images/cloudy-bg.jpg";
  } else if (weather === "Snow") {
    imagesPath = "./images/snowy.png";
    backgroundUrl = "images/snowy-bg.jpg";
  } else {
    imagesPath = "./images/sun.png";
    backgroundUrl = "images/sunny-bg.jpg";
  }

  // Displays The Image
  const weatherImage = document.getElementById("weather-image");
  weatherImage.src = imagesPath;
  weatherImage.style.display = "block"; // Ensure it's visible
  document.body.style.backgroundImage = `url('${backgroundUrl}')`;
}
function changeBackground(imageUrl) {
  document.body.style.background = `url(${imageUrl}) no-repeat center center / cover`;
}



  