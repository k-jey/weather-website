const request = require('request')

const forecast = (latitude, longitute, callback) =>{

    const url = 'https://api.darksky.net/forecast/fd6567bf947c33a9595577f299141cae/' +latitude +','
    +longitute +'?units=si'

    request({url:url, json:true}, (error,response) => {
        if(error){
            callback('Unable to Connect TO Weather Services', undefined)
        } else if (response.body.error){
            callback('Unable to Find Location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + 'It is currently ' 
            +response.body.currently.temperature +'degree and ' 
            +response.body.currently.precipProbability + ' % chance of rain'
            )
        }
    })
} 

module.exports = forecast