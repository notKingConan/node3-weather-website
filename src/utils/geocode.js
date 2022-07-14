const request = require('postman-request');

const geocode = (address, callback) => {

    const url = `http://api.positionstack.com/v1/forward?access_key=e23249506a020439f4e90b056a786e3c&query=${encodeURIComponent(address)}`;

    request( { url, json:true }, ( err, { body } = {} ) => {

        if(err) {
            callback('Connection disabled from the server', undefined);
        } else if ( body.error ) {
            callback('valid address is needed', undefined);
        } else {
            callback(undefined, {
                location: body.data[0].name,
                lat: body.data[0].latitude,
                long: body.data[0].longitude
            });
        };
    });

};

module.exports = geocode;