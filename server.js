const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for specific origin and methods
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET',
}));

// Fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const apiKey = process.env.VITE_OPENWEATHER_KEY;
    const { lat, lon } = req.query;

    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

    res.json(weatherResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
});

// Fetch location imagery
app.get('/location', async (req, res) => {
  try {
    const apiKey = process.env.VITE_GOOGLE_PLACES_KEY;
    const { lat, lon } = req.query;

    const locationResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1000&key=${apiKey}`);

    console.log(locationResponse)

    if (locationResponse.data.status === "ZERO_RESULTS") {
      console.log('Zero results for location imagery');
      res.status(404).json({ error: 'Zero results for location imagery' });
    } else {
      const data = locationResponse.data;

      const pickRandPic = () => {
        const rand = Math.floor(Math.random() * data.results.length);
        
        return rand;
      };
    //   console.log(data)
      const photoReference = data.results[0].photos[0].photo_reference;
      const apiBaseUrl = 'https://maps.googleapis.com/maps/api/place';
      const photoUrl = `${apiBaseUrl}/photo?maxwidth=1600&photoreference=${photoReference}&key=${apiKey}`;

      res.json({ url: photoUrl });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching location imagery' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
