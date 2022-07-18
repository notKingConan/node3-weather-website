// dependencies
// const path = require('path');
const express = require('express');
const hbs = require('hbs');
// const { dirname } = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
// const publicDirectoryPath = path.join(__dirname, '../public');
// const viewsPath = path.join(__dirname, '../templates');
// const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', 'templates/views');
// hbs.registerPartials(partialsPath);
hbs.registerPartials('templates/partials');

// setup static directory to serve
app.use(express.static('public'));

app.get('./', (req, res) => {
    
    res.render('index', {
        title: 'Weather',
        name: 'Daniel Osborn'
    });

});

app.get('', (req, res) => {

    res.send('<h1>Weather</h1>');

});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        titleLower: 'help',
        name: 'Daniel',
        message: 'This is a message for a paragraph',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Daniel Osborn'
    });
});

app.get('/weather', ( req, res ) => {
    
    if (!req.query.address) {
        return res.send({
            error: "You must enter a valid address",
        })
    };

    geocode( req.query.address, (err, { lat, long, location } = {}) => {
        if (err) {
            return res.send({
                err,
            })
        };

        forecast(lat, long, (err, {summary, country, description, temperature, feelslike}) => {
            if (err) {
                return res.send({
                    err,
                })
            };

            res.send({
                summary,
                forecast: description,
                location,
                country,
                temperature,
                feelslike,
            });
        })
    });
});

app.get('/help/*', (req, res) => {

    res.render('404', {
        name: '404',
        errorMessage: 'This help article does not exist',
    });

});


app.get('*', (req, res) => {

    res.render('404', {
        name: '404',
        errorMessage: 'This page does not exist',
    });

});

app.listen(port, () => {

    console.log(`Server started on port: ${port}`);

});