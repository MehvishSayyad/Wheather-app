const apiKey = 'c4f92971a0caa1507679039123bc201c';

function getWeatherByCity() {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    }
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        }, error => {
            alert('Unable to retrieve location. Please enter a city manually.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('weather').innerHTML = `
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            } else {
                document.getElementById('weather').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}
