

# React Weather App

## Overview
This React-based weather application provides real-time weather updates based on the user's location. It utilizes the OpenWeather API to fetch weather data.



## Prerequisites
- Node.js
- npm (Node Package Manager)
- A valid OpenWeather API key

## Installation and Setup
1. **Clone the repository**
   - Use `git clone [repository-url]` to clone the project to your local machine.

2. **Install dependencies**
   - Navigate to the project directory in your terminal and run `npm install` to install the necessary dependencies.

3. **Environment Variables**
   - Create a `.env` file in the root directory of the project.
   - Add your OpenWeather API key to the `.env` file as `VITE_WEATHER_API_KEY=[Your API Key Here]`.

## Running the Application
- In the project directory, run `npm start` to start the application.
- The app will run in development mode and will be available at `http://localhost:3000`.

## Features
- Real-time weather updates based on geolocation.
- Periodic weather data refresh every 2 minutes.
- Displays temperature, humidity, wind speed, and visibility metrics.
- Dynamic background change based on the time of day (day or night).

## Error Handling
- If an error occurs while fetching weather data, the app will display an error message. Please refresh the page or try again later.


## Image of App
![Weather App Screenshot](/public/ScreenShot.png)