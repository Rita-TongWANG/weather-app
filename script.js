function getWeather() {
    // 在获取天气数据并更新图片URL后，显示天气图标
document.getElementById('weather-icon').style.display = 'inline';
    const city = document.getElementById('city-input').value;
    const apiKey = 'd120de1c602d81af993d8bf59e2f1e4f'; // 替换为你的 OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const timeString = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            const temperature = data.main.temp;
            const tempMin = data.main.temp_min;
            const tempMax = data.main.temp_max;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

            document.getElementById('time').innerText = `Current time: ${timeString}`;
            document.getElementById('temperature').innerText = `Temperature: ${Math.round(temperature)}°C`;
            document.getElementById('temperature-range').innerText = `Temperature Range: ${Math.round(tempMin)}°C - ${Math.round(tempMax)}°C`;
            document.getElementById('weather').innerText = `Weather: ${weatherDescription}`;
            document.getElementById('weather-icon').src = weatherIcon;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
}

function getWeatherForecast() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'd120de1c602d81af993d8bf59e2f1e4f'; // 替换为你的 OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Weather Forecast API response:", data); // 调试输出
            
            // 处理获取的天气预报数据
            renderForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching weather forecast data:', error);
            alert('Failed to fetch weather forecast data. Please try again.');
        });
}


function renderForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // 清空之前的内容

    // 用于存储每天的温度数据和对应的天气图标
    const dailyData = {};

    // 遍历预报数据，按日期分组并计算每天的最低和最高温度以及对应的天气图标
    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];

        if (!dailyData[dateString]) {
            dailyData[dateString] = {
                min: item.main.temp_min,
                max: item.main.temp_max,
                icon: item.weather[0].icon, // 使用第一个预报的天气图标
                dayOfWeek: dayOfWeek // 存储星期几
            };
        } else {
            dailyData[dateString].min = Math.min(dailyData[dateString].min, item.main.temp_min);
            dailyData[dateString].max = Math.max(dailyData[dateString].max, item.main.temp_max);
        }
    });

    // 遍历每天的温度数据和天气图标，创建并添加显示元素
    Object.keys(dailyData).forEach(dateString => {
        const { min, max, icon, dayOfWeek } = dailyData[dateString];
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast');
        forecastElement.innerHTML = `
            <p>${dateString} (${dayOfWeek})</p>
            <p>Temperature: ${Math.round(min)}°C - ${Math.round(max)}°C</p>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        `;
        forecastContainer.appendChild(forecastElement);
    });
}


function renderForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // 清空之前的内容

    // 用于存储每天的温度数据和对应的天气图标
    const dailyData = {};

    // 遍历预报数据，按日期分组并计算每天的最低和最高温度以及对应的天气图标
    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];

        if (!dailyData[dateString]) {
            dailyData[dateString] = {
                min: item.main.temp_min,
                max: item.main.temp_max,
                icon: item.weather[0].icon, // 使用第一个预报的天气图标
                dayOfWeek: dayOfWeek // 存储星期几
            };
        } else {
            dailyData[dateString].min = Math.min(dailyData[dateString].min, item.main.temp_min);
            dailyData[dateString].max = Math.max(dailyData[dateString].max, item.main.temp_max);
        }
    });

    // 遍历每天的温度数据和天气图标，创建并添加显示元素
    Object.keys(dailyData).forEach(dateString => {
        const { min, max, icon, dayOfWeek } = dailyData[dateString];
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast');
        forecastElement.innerHTML = `
            <p>${dateString} (${dayOfWeek})</p>
            <p>Temperature: ${Math.round(min)}°C - ${Math.round(max)}°C</p>
            <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        `;
        forecastContainer.appendChild(forecastElement);
    });
}

// 在全局定义一个备用天气图标URL
const defaultWeatherIcon = 'image/dog.jpg';


// 在获取天气数据时，如果天气图标未能正确加载，将使用备用图标
document.getElementById('weather-icon').onerror = function() {
    this.src = defaultWeatherIcon;
};

// 在渲染天气预报时，如果某一天的天气图标未能正确加载，将使用备用图标
forecastElement.querySelector('img').onerror = function() {
    this.src = defaultWeatherIcon;
};
















