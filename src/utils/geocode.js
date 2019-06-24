const request = require('request')

const geoCode = (address, callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) 
    +'.json?access_token=pk.eyJ1IjoiOGFnbnVtIiwiYSI6ImNqd3JkaDJweDAwczY0NHM3ZGxmYzhxb2sifQ.vDFYl2fLMm7hsIvP3vQAWg&limit=1'

    request({url: url, json:true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to the services!', undefined)
        } else if (body.features.length < 1){
            callback('Unable to Find the Location. Try another Search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode