# Weather Dashboard

> A modern and interactive **Weather Dashboard** that provides real-time weather updates, hourly forecasts, 7-day predictions, and weather trend visualizations. Built with PHP, JavaScript, Bootstrap, and the Visual Crossing Weather API, this application offers an engaging and responsive weather experience.

![PHP](https://img.shields.io/badge/PHP-7.4+-777BB4?style=flat-square&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0+-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Table of Contents

- [About This Project](#about-this-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [File Descriptions](#file-descriptions)
- [Concepts Learned](#concepts-learned)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Contributors](#contributors)
- [Acknowledgments](#acknowledgments)
- [License](#license)
- [Contact](#contact)

---

## About This Project

This project was developed as part of our **Diploma in Computer Engineering** learning journey, in collaboration with my classmate **Pratham Patel**. It serves as a **beginner-level project** designed to understand and practice fundamental concepts of:

- **API Integration**: Working with external APIs (Visual Crossing Weather API) to fetch real-time data
- **PHP Backend**: Server-side scripting for API requests and data processing
- **JavaScript**: Client-side interactivity, DOM manipulation, and dynamic content updates
- **Data Visualization**: Creating charts and graphs using Chart.js library
- **Interactive Maps**: Integrating Leaflet.js for location visualization
- **Responsive Design**: Building mobile-friendly interfaces with Bootstrap 5

As a learning project, this implementation focuses on demonstrating how to integrate third-party APIs, handle asynchronous data, and create dynamic user interfaces. It's an excellent starting point for students and beginners who want to understand modern web development practices and API consumption.

---

## Key Features

- **Real-Time Weather Data**: Live updates from the Visual Crossing Weather API with current conditions
- **Smart Search**: Find weather by city name or coordinates (latitude & longitude)
- **Current Conditions Display**: Temperature, humidity, wind speed, UV index, pressure, and visibility
- **Hourly Forecast**: Detailed 24-hour weather predictions with hourly breakdowns
- **7-Day Forecast**: Extended weather predictions for the upcoming week
- **Dynamic Charts**: Beautiful temperature trend visualizations using Chart.js
- **Interactive Map**: View searched locations on an interactive map powered by Leaflet.js
- **Temperature Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F)
- **Fully Responsive**: Sleek, mobile-friendly UI powered by Bootstrap 5
- **Modern UI/UX**: Clean design with smooth animations and intuitive navigation

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **CSS Framework** | Bootstrap 5 |
| **Backend** | PHP 7.4+ |
| **Weather API** | Visual Crossing Weather API |
| **Chart Library** | Chart.js |
| **Map Library** | Leaflet.js |
| **Icons** | Font Awesome |
| **Server** | Apache (XAMPP/WAMP/MAMP) |

---

## Screenshots

### Home Page
![Home Page](assets/Screenshot(1).png)

### Search Feature & Forecast
![Search Feature](assets/Screenshot(2).png)

### Weather Trends (Charts)
![Weather Trends](assets/Screenshot(3).png)

### Interactive Map
![Interactive Map](assets/Screenshot(4).png)

---

## Project Structure

```
Weather-Dashbaord/
│
├── index.html          # Main HTML structure and layout
├── style.css           # Custom CSS styling and UI improvements
├── script.js           # JavaScript logic for API calls, DOM manipulation, and UI updates
├── config.php          # PHP backend script for API requests and data fetching
├── assets/             # Images, icons, and screenshots
│   ├── Screenshot(1).png
│   ├── Screenshot(2).png
│   ├── Screenshot(3).png
│   └── Screenshot(4).png
├── LICENSE             # MIT License file
└── README.md           # Project documentation
```

---

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- PHP 7.4 or higher
- Apache Server (XAMPP, WAMP, or MAMP)
- A modern web browser (Chrome, Firefox, Edge, Safari)
- Visual Crossing Weather API key (free tier available)

### Step 1: Clone the Repository

```bash
git clone https://github.com/beingdhruvv/Weather-Dashbaord.git
cd Weather-Dashbaord
```

### Step 2: Set Up Local Server

1. **Download and Install** a local server environment:
   - [XAMPP](https://www.apachefriends.org/download.html) (Recommended)
   - [WAMP](https://www.wampserver.com/) (Windows)
   - [MAMP](https://www.mamp.info/) (Mac)

2. **Start Services**: Launch XAMPP Control Panel and start Apache service

### Step 3: Configure API Key

1. **Get Your Free API Key**:
   - Visit [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
   - Sign up for a free account
   - Generate your API key from the dashboard

2. **Update Configuration**:
   - Open `config.php` in a text editor
   - Replace `YOUR_API_KEY` with your actual Visual Crossing API key:
   ```php
   $apiKey = "YOUR_API_KEY_HERE";
   ```

### Step 4: Run the Application

1. Move the project folder to your server's document root:
   - **XAMPP**: `C:\xampp\htdocs\Weather-Dashbaord\`
   - **WAMP**: `C:\wamp64\www\Weather-Dashbaord\`
   - **MAMP**: `/Applications/MAMP/htdocs/Weather-Dashbaord/`

2. Open your browser and navigate to:
   ```
   http://localhost/Weather-Dashbaord/
   ```

---

## Usage

1. **Search for Weather**: 
   - Enter a city name (e.g., "New York", "London", "Mumbai")
   - Or enter coordinates in format: `latitude,longitude` (e.g., `40.7128,-74.0060`)

2. **View Current Conditions**: 
   - See real-time temperature, humidity, wind speed, UV index, and more

3. **Check Forecasts**: 
   - View hourly forecast for the next 24 hours
   - Browse 7-day extended forecast

4. **Explore Visualizations**: 
   - Review temperature trends in the interactive chart
   - View location on the interactive map

5. **Toggle Units**: 
   - Switch between Celsius (°C) and Fahrenheit (°F) using the toggle button

---

## How It Works

The application follows a **client-server architecture** with API integration:

### Architecture Overview

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│  PHP Server  │────▶│ Weather API  │
│  (Frontend)  │◀────│  (Backend)   │◀────│ (Visual      │
│              │     │              │     │  Crossing)   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │
       │                    │
       ▼                    ▼
┌──────────────┐     ┌──────────────┐
│ Chart.js     │     │  Leaflet.js  │
│ (Charts)     │     │   (Maps)     │
└──────────────┘     └──────────────┘
```

### Workflow

1. **User Input**: User enters city name or coordinates in the search box
2. **JavaScript Capture**: Client-side JavaScript captures the search input
3. **AJAX Request**: JavaScript sends an asynchronous HTTP request to `config.php`
4. **PHP Processing**: PHP script receives the request and constructs API call URL
5. **API Request**: PHP makes HTTP request to Visual Crossing Weather API with location and API key
6. **Data Retrieval**: Weather API returns JSON data with current conditions and forecasts
7. **Data Processing**: PHP processes the JSON response and formats it
8. **JSON Response**: PHP sends formatted data back to client as JSON
9. **DOM Update**: JavaScript receives JSON and dynamically updates:
   - Current weather conditions
   - Hourly forecast cards
   - 7-day forecast list
   - Chart.js temperature graph
   - Leaflet.js map with location marker
10. **User Sees Results**: All information displays instantly without page reload

### Key Components

- **Frontend (Client-side)**: HTML structure, Bootstrap styling, JavaScript for interactivity
- **Backend (Server-side)**: PHP script handling API requests and data processing
- **External API**: Visual Crossing Weather API providing weather data
- **Libraries**: Chart.js for data visualization, Leaflet.js for maps
- **Communication**: AJAX for seamless data exchange between client and server

---

## File Descriptions

| File | Description |
|------|-------------|
| `index.html` | Main HTML structure containing the search interface, weather display cards, forecast sections, chart container, and map container |
| `style.css` | Custom stylesheet defining the visual design, layout, animations, and responsive behavior for mobile and desktop |
| `script.js` | Client-side JavaScript handling user interactions, AJAX requests, DOM manipulation, Chart.js initialization, Leaflet.js map setup, and dynamic content updates |
| `config.php` | Backend PHP script that receives location data, constructs API requests, fetches data from Visual Crossing Weather API, processes JSON responses, and returns formatted data to the frontend |
| `assets/` | Directory containing project screenshots and images used in documentation |

---

## Concepts Learned

Through building this project, we gained hands-on experience with:

### API Integration
- **RESTful API Consumption**: Making HTTP requests to external APIs
- **API Key Management**: Securely handling API credentials
- **JSON Data Handling**: Parsing and processing JSON responses
- **Error Handling**: Managing API errors and rate limits
- **Asynchronous Requests**: Understanding async/await and promises

### Frontend Development
- **DOM Manipulation**: Selecting elements, modifying content, and handling events
- **AJAX Implementation**: Asynchronous HTTP requests using Fetch API or XMLHttpRequest
- **Dynamic Content Updates**: Updating webpage content without page refresh
- **Event Handling**: Managing user interactions and form submissions
- **Responsive Design**: Creating mobile-friendly layouts with Bootstrap

### Data Visualization
- **Chart.js Integration**: Creating interactive charts and graphs
- **Data Formatting**: Preparing data for visualization
- **Real-time Updates**: Updating charts dynamically with new data

### Map Integration
- **Leaflet.js**: Integrating interactive maps
- **Geolocation**: Working with coordinates and location data
- **Map Markers**: Adding markers and popups to maps

### Backend Development
- **PHP Fundamentals**: Variables, arrays, functions, and control structures
- **HTTP Requests**: Making cURL requests in PHP
- **Data Processing**: Transforming API responses for frontend consumption
- **Server-side Logic**: Handling business logic and data validation

### Full-Stack Integration
- **Client-Server Communication**: Understanding request-response cycle
- **API Design**: Creating backend endpoints for frontend consumption
- **Data Flow**: Managing data from API → Backend → Frontend
- **Error Handling**: Managing errors across the entire stack

This project helped solidify our understanding of modern web development practices, API integration, and creating dynamic, interactive user interfaces.

---

## Troubleshooting

### Common Issues and Solutions

#### API Key Not Working
**Symptoms**: No weather data appears, error messages about API key

**Solutions**:
- Verify your API key is correctly entered in `config.php`
- Check if API key has expired or reached rate limit
- Ensure API key is active in Visual Crossing dashboard
- Verify API key has proper permissions for weather data access

#### No Results Showing
**Symptoms**: Search works but no weather data displays

**Solutions**:
- Open browser Developer Tools (F12) and check Console for JavaScript errors
- Verify AJAX requests are reaching the server (check Network tab)
- Check PHP error logs for server-side issues
- Ensure `config.php` is accessible and returns valid JSON
- Verify city name is spelled correctly or coordinates are valid

#### Map Not Displaying
**Symptoms**: Weather data shows but map is blank

**Solutions**:
- Check if Leaflet.js library is loaded correctly
- Verify internet connection (Leaflet requires CDN access)
- Check browser console for Leaflet.js errors
- Ensure coordinates are valid and in correct format

#### Charts Not Rendering
**Symptoms**: Chart container is empty or shows errors

**Solutions**:
- Verify Chart.js library is loaded correctly
- Check browser console for Chart.js errors
- Ensure data is properly formatted for Chart.js
- Verify chart canvas element exists in HTML

#### Page Not Loading
**Symptoms**: Blank page or 404 error

**Solutions**:
- Confirm Apache server is running
- Verify file paths are correct and files are in the right directory
- Check PHP is properly installed and configured
- Ensure file permissions are set correctly
- Check for PHP syntax errors in `config.php`

#### CORS Errors
**Symptoms**: Browser console shows CORS policy errors

**Solutions**:
- Ensure PHP script sets proper headers:
  ```php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  ```
- Verify API requests are made from server-side (PHP), not directly from JavaScript

---

## Future Improvements

Potential enhancements for future versions:

### Functionality
- [ ] Add weather alerts and notifications
- [ ] Implement location-based weather using browser geolocation API
- [ ] Add weather history and comparison features
- [ ] Include air quality index (AQI) data
- [ ] Add multiple location favorites/bookmarks
- [ ] Implement weather widget for other websites
- [ ] Add weather-based recommendations (clothing, activities)

### Performance
- [ ] Implement caching mechanism for API responses
- [ ] Add service worker for offline functionality
- [ ] Optimize API calls to reduce rate limit usage
- [ ] Implement lazy loading for images and maps
- [ ] Add request debouncing for search input

### User Experience
- [ ] Enhance responsive design for tablets and mobile devices
- [ ] Add loading indicators and skeleton screens
- [ ] Implement smooth animations and transitions
- [ ] Add dark mode support
- [ ] Improve accessibility (ARIA labels, keyboard navigation)
- [ ] Add weather icons and visual indicators
- [ ] Implement search suggestions/autocomplete

### Data Visualization
- [ ] Add more chart types (humidity, wind speed, precipitation)
- [ ] Implement interactive chart tooltips
- [ ] Add comparison charts for multiple locations
- [ ] Include radar and satellite imagery

### Code Quality
- [ ] Add comprehensive error handling and validation
- [ ] Implement input sanitization and security measures
- [ ] Add unit tests for JavaScript functions
- [ ] Implement code documentation (JSDoc, PHPDoc)
- [ ] Add logging and monitoring
- [ ] Refactor code for better maintainability

### Deployment
- [ ] Docker containerization support
- [ ] Environment configuration management
- [ ] CI/CD pipeline setup
- [ ] Production deployment guide
- [ ] Add environment variables for API keys

---

## Contributors

We welcome contributions! This project was developed collaboratively as part of our Diploma in Computer Engineering coursework.

### Core Contributors

- **Dhruv Suthar** - [@beingdhruvv](https://github.com/beingdhruvv)

- **Pratham Patel** - [@Prathampatel10](https://github.com/Prathampatel10)

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:
- Use the project commercially
- Modify and distribute
- Use privately
- Include in proprietary software




