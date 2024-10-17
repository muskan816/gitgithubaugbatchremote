<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather</title>
    <script src = "https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background-image: linear-gradient(to bottom, blue, white);
            height: 100%;
            width: 100%;
        }
        #inputContainer {
            display: flex;
            justify-content: center;
            margin-top: 20px;
        }
        #input {
            /* width: 350px; */
            height: 40px;
            font-size: 20px;
            text-align: center;
            margin-right: 20px;
            border: 1px solid black;
            border-radius: 5px;
            box-shadow: 2px 2px 10px black;
        }
        #search {
            width: 100px;
            height: 40px;
            font-size: 20px;
            background-color: white;
            border: 1px solid black;
            border-radius: 5px;
            cursor: pointer;
            box-shadow: 2px 2px 10px black;
        }
        h1 {
            text-align: center;
            /* font-size: 45px; */
            color: cornsilk;
            text-shadow: 3px 2px 1px black;
        }
        .forecast {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            margin-top: 30px;
            gap: 30px;
            justify-items: center;
        }
        .forecast-item {
            text-align: center;
            font-size: 18px;
            border: 1px solid black;
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 5px;
            box-shadow: 2px 2px 10px black;
        }
        .history {
            margin-top: 50px;
        }
        .history-item {
            background-color: rgba(255, 255, 255, 0.8);
            margin: 10px;
            padding: 10px;
            border: 1px solid black;
            border-radius: 5px;
            box-shadow: 2px 2px 10px black;
            display: flex;
            gap: 40px;
        }
        #dropdown{width: 350px;
            font-size: 20px;
            text-align: center;
            margin-right: 20px;
            border: 1px solid black;
            border-radius: 5px;
            box-shadow: 2px 2px 10px black;
            background-color: white;}
    </style>
</head>
<body>
    <h1 class="text-[30px] sm:text-[45px]">Weather Forecast</h1>
    <div id="inputContainer">
        <div><input id="input" type="text" placeholder="Enter your city name" class="w-[200px] sm:w-[350px] ml-[30px] sm:ml-0 sm:mr-5"><div id="dropdown"></div></div>
        <button id="search" class="-ml-28 sm:ml-0">Search</button>
    </div>
    <h3 id="city" class="w-[180px] sm:w-[350px] font-bold text-xl sm:text-3xl"></h3>

    <div class="forecast grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8 w-full max-w-screen-lg justify-items-center font-bold" id="forecastContainer"></div>

    <div class="history w-full max-w-screen-lg mt-10 space-y-6 grid grid-flow-row" id="historyList"></div>

    <script>
        const input = document.getElementById("input");
        const search = document.getElementById("search");
        const forecastContainer = document.getElementById("forecastContainer");
        const historyList = document.getElementById("historyList");
        const enteredCity = document.getElementById("city");
        const dropdown = document.getElementById("dropdown")

        input.addEventListener("click", function(){
            const filledItem = input.value.trim()
            const option = document.createElement("option")
            dropdown.appendChild(option)
            option.innerHTML = filledItem
            dropdown.style.hide.remove()
            dropdown.style.display = "none"
        })

        let weatherHistory = [];

        search.addEventListener("click", function () {
            const cityName = input.value.trim();
            if (cityName) {
                fetchWeather(cityName);
            } else {
                enteredCity.innerText = "Please enter a city name.";
            }
        });

        function fetchWeather(cityName) {
            const apiKey = "c82bdb34c69be2d49785cf841a28fa5f";
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayForecast(data, cityName);
                    saveHistory(data, cityName);
                })
                .catch(error => {
                    enteredCity.innerText = "Error fetching weather. Please try again.";
                    console.error(error);
                });
        }

        function displayForecast(data, cityName) {
            enteredCity.innerText = `Weather forecast for ${cityName}`;
            forecastContainer.innerHTML = ""; // Clear previous forecast

            for (let i = 0; i < data.list.length; i += 8) {  // Every 8th item (24-hour intervals)
                const forecast = data.list[i];
                const date = new Date(forecast.dt_txt).toLocaleDateString("en-GB", {
                    weekday: "long"
                });
                const temp = Math.round(forecast.main.temp - 273.15);
                const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                const windSpeed = forecast.wind.speed;
                const humidity = forecast.main.humidity;

                const forecastItem = document.createElement("div");
                forecastItem.className = "forecast-item";
                forecastItem.innerHTML = `
                    <h3>${date}</h3>
                    <img src="${icon}" alt="Weather icon">
                    <p><strong>Temp:</strong> ${temp}°C</p>
                    <p><strong>Wind:</strong> ${windSpeed} m/s</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                `;
                forecastContainer.appendChild(forecastItem);
            }
        }

        function saveHistory(data, cityName) {
            const historyEntry = {
                cityName: cityName,
                forecast: data.list.filter((_, index) => index % 8 === 0).map(forecast => ({
                    date: new Date(forecast.dt_txt).toLocaleDateString("en-GB", {
                        weekday: "long"
                    }),
                    temp: Math.round(forecast.main.temp - 273.15),
                    icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
                    wind: forecast.wind.speed,
                    humidity: forecast.main.humidity
                }))
            };

            weatherHistory.push(historyEntry);
            displayHistory();
        }

        function displayHistory() {
            historyList.innerHTML = ""; // Clear previous history

            weatherHistory.forEach(entry => {
                const historyItem = document.createElement("div");
                historyItem.className = "history-item";
                historyItem.innerHTML = `
                    <h2>${entry.cityName}</h2>
                    ${entry.forecast.map(day => `
                        <div>
                            <h3>${day.date}</h3>
                            <img src="${day.icon}" alt="Weather icon">
                            <p><strong>Temp:</strong> ${day.temp}°C</p>
                            <p><strong>Wind:</strong> ${day.wind} m/s</p>
                            <p><strong>Humidity:</strong> ${day.humidity}%</p>
                        </div>
                    `).join("")}
                `;
                historyList.appendChild(historyItem);
            });
        }
    </script>
</body>
</html>


