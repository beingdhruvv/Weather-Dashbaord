<?php
/**
 * Weather Dashboard API Configuration
 * 
 * This file handles the communication with the Visual Crossing Weather API
 * and implements caching to minimize API calls and improve performance.
 * 
 * Author: Dhruv Suthar & Pratham Patel
 * version 1.0.0
 */

// API Configuration
define('API_KEY', 'YOUR_API_KEY');
define('CACHE_TIME', 3600); // Cache duration in seconds (1 hour)

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Enable CORS for cross-origin requests

// Validate required parameters
if (empty($_GET['location'])) {
    die(json_encode(['error' => 'Location not provided']));
}

// Define API request parameters
$params = [
    'location' => urlencode($_GET['location']),
    'include' => 'days,hours,current,alerts',
    'elements' => implode(',', [
        // Time-related elements
        'datetime',
        // Temperature elements
        'temp', 'tempmax', 'tempmin', 'feelslike',
        // Atmospheric conditions
        'humidity', 'windspeed', 'winddir', 'pressure', 'visibility',
        'uvindex', 'conditions', 'description',
        // Weather indicators
        'icon', 'precipprob', 'preciptype', 'cloudcover',
        // Astronomical data
        'sunrise', 'sunset'
    ])
];

// Cache management
$cacheFile = 'cache/' . md5($params['location']) . '.json';
!file_exists('cache') && mkdir('cache', 0755, true);

// Return cached data if it's still valid
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < CACHE_TIME)) {
    die(file_get_contents($cacheFile));
}

// Construct API URL with all parameters
$url = sprintf(
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/%s?unitGroup=metric&key=%s&contentType=json&include=%s&elements=%s',
    $params['location'],
    API_KEY,
    $params['include'],
    $params['elements']
);

// Initialize and configure cURL request
$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true
]);

// Execute API request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Handle API errors
if ($response === false || $httpCode !== 200) {
    die(json_encode(['error' => $error ?: 'Failed to fetch weather data']));
}

// Cache successful response and return data
file_put_contents($cacheFile, $response);
echo $response;
?>