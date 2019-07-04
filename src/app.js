// core modules
const path = require('path')

// npm modules
const express = require('express')
const hbs = require('hbs')

const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths or express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partials)

// setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Chitra'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Chitra'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message : 'Help text' ,
        title : 'Help',
        name : 'Chitra'
    })
})

app.get('/weather', (req,res)=> {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    else{
        geocode(req.query.address,(error,{ latitude, longitude, location} = {})=>{
    
            if(error)
            {
                return res.send({
                    error: error
                })
            }
        
            forecast(latitude, longitude , (error, forecastData) => {
                if(error)
                {
                    return res.send({
                        error: error
                    })
                }
                
                res.send({
                    address : req.query.address,
                    forecast : forecastData,
                    location : location
                })
            })
        })        
    }
})

app.get('/products', (req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products : []
    })

})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title : '404',
        name : 'Chitra',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title : '404',
        name : 'Chitra',
        errorMessage:'Page not Found'
    })
})

app.listen(port, ()=>{
    console.log('Sever is up on port '+port)
})