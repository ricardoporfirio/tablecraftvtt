const { app, express } = require('./server')

const cors = require('cors')
const router = require('./router')
// enable cors
app.use(cors())

// set ejs as view engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// set public folder as static folder for static file
app.use(express.static('public'))

// initialize router
app.use(router)
