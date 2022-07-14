const request = require('postman-request');

const forecast = (lat, long, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=f33afd4c1192c7dbe92960bad325fc01&query=${lat},${long}`;
    request({ url, json:true }, (err, { body } = {} ) => {
        if(err) {
            callback('No response from the server', undefined);
        } else if (body.error) {
            callback('Please enter valid parameters', undefined);
        } else {
        callback(undefined, {
            summary: `The temperature in ${body.location.name} is ${body.current.temperature} with a wind speed of ${body.current.wind_speed}mph coming from the ${body.current.wind_dir}.`,
            location: body.location.name,
            country: body.location.country,
            temperature: body.current.temperature,
            description: body.current.weather_descriptions[0],
            feelslike: body.current.feelslike,
        });
        }
    });

};

module.exports = forecast;