const express = require('express')
const router = require('./config/router')

// initialize express
const app = express()

// set ejs as view engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// set public folder as static folder for static file
app.use(express.static('public'))

// initialize router
app.use(router)

// listen to port 3000
app.listen(3000, () => {
  console.log('Welcome to TableCraftVTT')
  console.log('Running on http://localhost:3000')
})
