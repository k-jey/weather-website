const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Jey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Jey'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Please enter the password!',
        author: 'Jey'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'The help page that you are looking for is not found',
        author: 'Jey'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address){
        return res.send({
            error: "Please provide the address !!"
        })
    } else {
        geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error){
                return res.send({
                    error
                })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({
                        error
                    })
                }
        
                // console.log(location)
                // console.log(forecastData)
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
              })
        })
    }
})

app.get('/product', (req, res) => {
    if (!req.query.search){
        return res.send({
            error:'Search Term is Required !!!'
        })
    }
    
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        msg: 'The page is Not Found',
        author: 'Jey'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' +port)
})