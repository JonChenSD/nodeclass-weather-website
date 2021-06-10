const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Deffine paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jon Chen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jon Chen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jon Chen',
        message: 'get help here'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "You must provide a address"
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude , longitude, location} = {}) => {
        if(error){
            return res.send({
                error:error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error:error
                })
            }
            
            res.send({
                address:req.query.address,
                forecast: forecastData.description,
                location: location
            })
          })
    })
    console.log(req.query)
    
})



app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jon Chen',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jon Chen',
        errorMessage: 'Page not found.'
    })
})

// app.com

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})