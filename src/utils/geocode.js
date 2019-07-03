const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)  +'.json?access_token=pk.eyJ1IjoiY2hpdHJhODciLCJhIjoiY2p3dzFnbmxuMDJubjQwcG10bXJsamxoaSJ9.mKygHTWkHv59dsExbCzH8w&limit=1'

    request({  url , json : true}, (error, { body : responseBody} )=> {
        if(error)
        {
            callback('Unable to connect to location services!', undefined)
        }
        else if (responseBody.features.length === 0)
        {
            callback('Unable to find location. Try again with another search term', undefined)
        }
        else{
            const longitude=responseBody.features[0].center[0];
            const latitude = responseBody.features[0].center[1];
            const location = responseBody.features[0].place_name;
            callback(undefined,{ latitude ,  longitude ,  location})
        }
    })
}

module.exports = geocode