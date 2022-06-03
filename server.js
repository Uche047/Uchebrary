if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')
const mongoose = require('mongoose')

app.set('view engine', 'ejs')   // setting view engine
app.set('views', __dirname + '/views') // Getting current directory and appending to views
app.set('layout', 'layouts/layout')
app.use(expressLayouts) // Telling express you want to use the layouts file
app.use(express.static('public')) // Telling express where the static files will be



mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
console.log("Hi")
 
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)