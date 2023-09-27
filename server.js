const PORT = 8000

const express = require('express');
const cors = require('cors')
const axios = require('axios')

require('dotenv').config()

const app = express()

// Use the 'cors' middleware to enable CORS for your frontend domain
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow the HTTP methods you need
  }));



app.get('/weather', (req, res) => {
    const apiKey = process.env.VITE_OPENWEATHER_KEY;
    const latitude = req.query.lat;
    const longitude = req.query.lon;
   
    const options = {
        method: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric` 
    }

    axios.request(options).then((response) => {
        res.json(response.data)
    })
    

})

app.get('/location', (req, res) => {

        const apiKey = process.env.VITE_GOOGLE_PLACES_KEY;
        const latitude = req.query.lat;
        const longitude = req.query.lon;

        console.log(req.query.lat)
        console.log(req.query.lon)
    
        const options = {
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&key=${apiKey}`
        }

        axios.request(options).then((response) => {
            const data = response.data
            // res.json(response.data)
            if (response.data.status === "ZERO_RESULTS") {
                console.log('zero results for location imagery')
            }else{
                // console.log(data)
                const photoReference = data.results[0].photos[0].photo_reference;
                const apiBaseUrl = 'https://maps.googleapis.com/maps/api/place'
                const photoUrl = `${apiBaseUrl}/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
                console.log(photoUrl)
                res.send({"url": photoUrl})
            }
            
        })
})

app.listen(8000, () => console.log('server is running on port: ', PORT));