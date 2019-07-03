const request = require('request')

var forecast = (latitude , longitude , callback) =>{
    var url = 'https://api.darksky.net/forecast/4e3cdcc7e6a376d8585597f3b048329d/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

    request({ url , json : true }, (error, { body : responseBody})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(responseBody.error){
            callback('Unable to find location',undefined)
        }
        else{
            const currently = responseBody.currently
            callback(undefined,responseBody.daily.data[0].summary+' It is currently '+ currently.temperature +' degrees out. There is a '+ currently.precipProbability +'% chance of rain.')
        }
    })
}

module.exports=forecast