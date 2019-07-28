if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY;
const GOOGLE_GEOCODING_API_KEY = process.env.GOOGLE_GEOCODING_API_KEY;
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.post('/weather', (req, res) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.lat},${req.body.lon}?units=auto`;
    axios({
        url: url,
        responseType: 'json'
    }).then(response => {
        return res.json(response.data);
    });
});

app.post('/geocode', (req, res) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.lon}&key=${GOOGLE_GEOCODING_API_KEY}`;
    axios({
        url: url,
        responseType: 'json'
    }).then(response => {
        console.log(GOOGLE_GEOCODING_API_KEY);

        return res.json(response.data);
    });
    // axios.get('http://localhost:3000/sample.json').then(response => {
    //     return res.json(response.data);
    // }).catch(err => {
    //     console.log(err);

    // });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server started');
});