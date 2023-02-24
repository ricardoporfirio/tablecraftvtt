const express = require('./config/server').express
const app = require('./config/server').app
const server = require('./config/server').server

const cors = require('cors')
const router = require('./config/router')
// enable cors
app.use(cors())

// set ejs as view engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// set public folder as static folder for static file
app.use(express.static('public'))

// initialize router
app.use(router)

require('./config/http')

server.listen(3000, () => {
  console.log('Welcome to TableCraftVTT')
  console.log('Running on http://localhost:3000')
})
