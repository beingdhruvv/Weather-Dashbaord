/**
 * Weather Dashboard Application
 * 
 * A modern weather application that provides detailed weather information using the
 * Visual Crossing Weather API. Features include current conditions, hourly forecasts,
 * 7-day predictions, interactive charts, and location mapping.
 * 
 * Dependencies:
 * - Bootstrap 5.3.0 (UI framework)
 * - Chart.js (for weather data visualization)
 * - Leaflet.js (for interactive maps)
 * - Font Awesome 6.4.0 (for icons)
 * 
 * Author: Dhruv Suthar & Pratham Patel
 * version 1.0.0
 */

// DOM Elements - Organized by functionality
const elements = {
    location: document.getElementById('locationInput'),
    search: document.getElementById('searchBtn'),
    current: document.getElementById('currentWeather'),
    forecast: document.getElementById('forecast'),
    hourly: document.getElementById('hourlyForecast'),
    charts: document.getElementById('charts'),
    map: document.getElementById('mapContainer'),
    loading: document.getElementById('loadingIndicator'),
    searches: document.getElementById('recentSearches'),
    units: document.getElementById('toggleUnits')
};

// Weather display elements for current conditions
const weather = {
    city: document.getElementById('cityName'),
    date: document.getElementById('currentDate'),
    temp: document.getElementById('currentTemp'),
    icon: document.getElementById('weatherIcon'),
    condition: document.getElementById('currentCondition'),
    feels: document.getElementById('feelsLike'),
    wind: document.getElementById('currentWind'),
    humidity: document.getElementById('currentHumidity'),
    uv: document.getElementById('uvIndex'),
    visibility: document.getElementById('visibility'),
    pressure: document.getElementById('pressure'),
    clouds: document.getElementById('cloudCover')
};

// Chart instances for temperature and precipitation
let tempChart, precipChart, map;

// Application state management
const state = {
    units: 'metric', // 'metric' or 'imperial'
    currentData: null, // Stores the latest weather data
    recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || []
};

// Weather icon mapping for different conditions
const weatherIcons = {
    'clear-day': '☀️', 'clear-night': '🌙', 'partly-cloudy-day': '⛅',
    'partly-cloudy-night': '🌙', 'cloudy': '☁️', 'rain': '🌧️',
    'snow': '❄️', 'sleet': '🌨️', 'wind': '💨', 'fog': '🌫️',
    'thunderstorm': '⛈️', 'thunder': '⛈️', 'thunder-rain': '⛈️',
    'thunder-showers-day': '⛈️', 'thunder-showers-night': '⛈️',
    'showers-day': '🌦️', 'showers-night': '🌧️'
};

/**
 * Core Application Functions
 */

// Initialize the application
const init = () => {
    elements.search.addEventListener('click', handleSearch);
    elements.location.addEventListener('keypress', e => e.key === 'Enter' && handleSearch());
    elements.units.addEventListener('click', handleUnitToggle);
    displayRecentSearches();
    state.recentSearches[0] && fetchWeatherData(state.recentSearches[0]);
};

// Handle search functionality
const handleSearch = async () => {
    const location = elements.location.value.trim();
    if (!location) return showToast('Please enter a location', 'error');
    showLoading(true);
    try {
        await fetchWeatherData(location);
        addToRecentSearches(location);
    } catch (error) {
        showToast(error.message || 'Failed to fetch weather data', 'error');
    } finally {
        showLoading(false);
    }
};

// Toggle between metric and imperial units
const handleUnitToggle = () => {
    state.units = state.units === 'metric' ? 'imperial' : 'metric';
    elements.units.innerHTML = `<i class="fas fa-temperature-high"></i> Switch to ${state.units === 'metric' ? '°F' : '°C'}`;
    state.currentData && displayAllWeatherData(state.currentData);
};

/**
 * Recent Searches Management
 */

// Add a location to recent searches
const addToRecentSearches = location => {
    state.recentSearches = [location, ...state.recentSearches.filter(item => item.toLowerCase() !== location.toLowerCase())].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(state.recentSearches));
    displayRecentSearches();
};

// Display recent searches in the UI
const displayRecentSearches = () => {
    elements.searches.innerHTML = state.recentSearches
        .map(location => `<span class="badge bg-secondary me-2" onclick="elements.location.value='${location}';handleSearch()">${location}</span>`)
        .join('');
};

/**
 * UI State Management
 */

// Toggle loading state and visibility of weather sections
const showLoading = show => {
    elements.loading.classList.toggle('d-none', !show);
    [elements.current, elements.forecast, elements.hourly, elements.charts, elements.map]
        .forEach(el => el.classList.toggle('d-none', show));
};

/**
 * Weather Data Management
 */

// Fetch weather data from the API
const fetchWeatherData = async location => {
    try {
        const response = await fetch(`config.php?location=${encodeURIComponent(location)}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        state.currentData = data;
        displayAllWeatherData(data);
        showToast(`Weather data updated for ${data.resolvedAddress}`, 'success');
        document.title = `${Math.round(data.currentConditions.temp)}°${state.units === 'metric' ? 'C' : 'F'} - ${data.resolvedAddress} | Weather Dashboard`;
        data.alerts?.length && displayWeatherAlerts(data.alerts);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch weather data. Please try again.');
    }
};

// Display all weather data sections
const displayAllWeatherData = data => {
    showLoading(false);
    displayCurrentWeather(data);
    displayHourlyForecast(data);
    displayDailyForecast(data);
    displayCharts(data);
};

/**
 * Weather Display Functions
 */

// Display current weather conditions
const displayCurrentWeather = data => {
    const current = data.currentConditions || data.days[0];
    const today = data.days[0];
    const date = new Date(today.datetime);
    const tempValue = state.units === 'metric' ? today.temp : celsiusToFahrenheit(today.temp);
    const tempUnit = state.units === 'metric' ? '°C' : '°F';
    
    // Update UI elements with current weather data
    weather.city.textContent = data.resolvedAddress;
    weather.date.textContent = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    weather.temp.textContent = `${Math.round(tempValue)}${tempUnit}`;
    weather.icon.textContent = getWeatherIcon(current.icon || 'cloudy');
    weather.condition.textContent = current.conditions;
    weather.feels.textContent = `Feels like: ${Math.round(state.units === 'metric' ? today.feelslike : celsiusToFahrenheit(today.feelslike))}${tempUnit}`;
    weather.wind.textContent = `${Math.round(state.units === 'metric' ? today.windspeed : today.windspeed * 0.621371)} ${state.units === 'metric' ? 'km/h' : 'mph'}`;
    weather.humidity.textContent = `${today.humidity}%`;
    weather.uv.textContent = today.uvindex;
    weather.visibility.textContent = `${(state.units === 'metric' ? today.visibility : today.visibility * 0.621371).toFixed(1)} ${state.units === 'metric' ? 'km' : 'mi'}`;
    weather.pressure.textContent = `${today.pressure} hPa`;
    weather.clouds.textContent = `${today.cloudcover}%`;
    
    elements.current.classList.remove('d-none');
};

// Display hourly forecast
const displayHourlyForecast = data => {
    if (!data.days[0].hours) return;
    const now = new Date();
    const allHours = data.days.flatMap(day => 
        (day.hours || []).map(hour => ({...hour, fullDate: new Date(day.datetime + 'T' + hour.datetime)}))
    ).filter(hour => hour.fullDate >= now).slice(0, 24);
    
    // Generate hourly forecast HTML
    document.querySelector('.hourly-container').innerHTML = allHours.map((hour, index) => {
        const hourNum = hour.fullDate.getHours();
        const formattedHour = hourNum === 0 ? '12 AM' : hourNum === 12 ? '12 PM' : hourNum > 12 ? `${hourNum - 12} PM` : `${hourNum} AM`;
        const isToday = hour.fullDate.getDate() === now.getDate();
        const isTomorrow = hour.fullDate.getDate() === new Date(now.getTime() + 86400000).getDate();
        const dayIndicator = !isToday ? (isTomorrow ? '<div class="day-indicator">Tmrw</div>' : 
            `<div class="day-indicator">${hour.fullDate.toLocaleDateString('en-US', { weekday: 'short' })}</div>`) : '';
        const temp = state.units === 'metric' ? hour.temp : celsiusToFahrenheit(hour.temp);
        const precipProb = hour.precipprob || 0;
        
        return `
            <div class="hourly-item ${index === 0 ? 'current-hour' : ''}">
                <div class="hour">${formattedHour}${dayIndicator}</div>
                <div class="icon">${getWeatherIcon(hour.icon || 'cloudy')}</div>
                <div class="temp">${Math.round(temp)}${state.units === 'metric' ? '°C' : '°F'}</div>
                <div class="precip ${precipProb === 0 ? 'no-precip' : ''}">
                    <i class="fas fa-tint"></i> ${precipProb}%
                </div>
            </div>`;
    }).join('');
    
    elements.hourly.classList.remove('d-none');
};

// Display 7-day forecast
const displayDailyForecast = data => {
    document.querySelector('.forecast-row').innerHTML = data.days.slice(0, 7).map((day, i) => {
        const date = new Date(day.datetime);
        const tempHigh = state.units === 'metric' ? day.tempmax : celsiusToFahrenheit(day.tempmax);
        const tempLow = state.units === 'metric' ? day.tempmin : celsiusToFahrenheit(day.tempmin);
        const tempUnit = state.units === 'metric' ? '°C' : '°F';
        
        return `
            <div class="col-md-auto forecast-card">
                <div class="day">${i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div class="date">${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}</div>
                <div class="icon">${getWeatherIcon(day.icon || 'cloudy')}</div>
                <div class="temp-high">${Math.round(tempHigh)}${tempUnit}</div>
                <div class="temp-low">${Math.round(tempLow)}${tempUnit}</div>
            </div>`;
    }).join('');
    
    elements.forecast.classList.remove('d-none');
};

// Display weather charts
const displayCharts = data => {
    elements.charts.classList.remove('d-none');
    
    // Temperature Chart
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    tempChart?.destroy();
    
    const tempData = data.days.slice(0, 7).map(day => ({
        date: new Date(day.datetime),
        temp: state.units === 'metric' ? day.temp : celsiusToFahrenheit(day.temp),
        tempMin: state.units === 'metric' ? day.tempmin : celsiusToFahrenheit(day.tempmin),
        tempMax: state.units === 'metric' ? day.tempmax : celsiusToFahrenheit(day.tempmax)
    }));
    
    // Create temperature chart
    tempChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: tempData.map(d => d.date.toLocaleDateString('en-US', { weekday: 'short' })),
            datasets: [{
                label: `Temperature Range (${state.units === 'metric' ? '°C' : '°F'})`,
                data: tempData.map(d => [d.tempMin, d.tempMax]),
                backgroundColor: 'rgba(74, 111, 220, 0.2)',
                borderColor: 'rgba(74, 111, 220, 1)',
                fill: true,
                type: 'line'
            }, {
                label: `Average Temperature (${state.units === 'metric' ? '°C' : '°F'})`,
                data: tempData.map(d => d.temp),
                borderColor: '#ff6384',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Temperature Forecast' },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: context => context.datasetIndex === 0 ? 
                            `Range: ${Math.round(context.raw[0])}° - ${Math.round(context.raw[1])}°` : 
                            `Average: ${Math.round(context.raw)}°`
                    }
                }
            },
            scales: {
                y: { title: { display: true, text: `Temperature (${state.units === 'metric' ? '°C' : '°F'})` } }
            }
        }
    });
    
    // Precipitation Chart
    const precipCtx = document.getElementById('precipChart').getContext('2d');
    precipChart?.destroy();
    
    const hourlyData = data.days
        .flatMap(day => day.hours || [])
        .filter(hour => new Date(hour.datetime) >= new Date())
        .slice(0, 24);
    
    // Create precipitation chart
    precipChart = new Chart(precipCtx, {
        type: 'bar',
        data: {
            labels: hourlyData.map(hour => formatHourLabel(new Date(hour.datetime))),
            datasets: [{
                label: 'Precipitation Probability (%)',
                data: hourlyData.map(hour => hour.precipprob || 0),
                backgroundColor: hourlyData.map(hour => 
                    hour.precipprob > 70 ? 'rgba(234, 32, 39, 0.6)' :
                    hour.precipprob > 40 ? 'rgba(255, 159, 64, 0.6)' :
                    'rgba(54, 162, 235, 0.6)'
                ),
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Precipitation Forecast' },
                tooltip: {
                    callbacks: {
                        label: context => {
                            const hour = hourlyData[context.dataIndex];
                            let label = `Probability: ${Math.round(context.raw)}%`;
                            hour.preciptype && (label += `\nType: ${hour.preciptype.join(', ')}`);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, max: 100, title: { display: true, text: 'Probability (%)' } }
            }
        }
    });
};

/**
 * Map Functionality
 */

// Initialize and display the map
function initMap(lat, lon, locationName) {
    if (!lat || !lon) return;
    
    elements.map.classList.remove('d-none');
    if (map) map.remove();
    
    map = L.map('map').setView([lat, lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([lat, lon]).addTo(map).bindPopup(locationName).openPopup();
}

/**
 * Helper Functions
 */

// Get weather icon based on condition
const getWeatherIcon = icon => weatherIcons[icon] || '🌤️';

// Convert Celsius to Fahrenheit
const celsiusToFahrenheit = c => (c * 9/5) + 32;

// Format hour label for charts
const formatHourLabel = date => `${date.getHours() % 12 || 12} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;

/**
 * Notification System
 */

// Show toast notification
const showToast = (message, type = 'info') => {
    const toastContainer = document.getElementById('toastContainer') || (() => {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(container);
        return container;
    })();
    
    const toast = document.createElement('div');
    toast.className = `toast show ${type}`;
    toast.innerHTML = `
        <div class="toast-body">
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
        </div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
};

// Display weather alerts
const displayWeatherAlerts = alerts => alerts.forEach(alert => showToast(`⚠️ Weather Alert: ${alert.event}`, 'error'));

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);