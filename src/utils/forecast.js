const request = require('request') 
// const url = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=f98de4486b234f7fd5bf3a9a466ecf6a'

const forecast = (latitude, longitude, callback ) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=f98de4486b234f7fd5bf3a9a466ecf6a'

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.cod != 200) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                temp: body.main.temp,
                description: body.weather[0].description
            })
        }
    })
    
}

module.exports = forecast
