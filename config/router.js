const router = require('express').Router()

// Controllers imports
const web = require('../src/app/controllers/webcontroller')
const game = require('../src/app/controllers/gamecontroller')

// Routes
router.use('/', web)
router.use('/game', game)

module.exports = router
