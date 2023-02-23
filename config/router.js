const router = require('express').Router()

// Controllers imports
const web = require('../src/app/controllers/webcontroller')

// Routes
router.use('/', web)

module.exports = router
