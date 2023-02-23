const router = require('express').Router()
const game = require('./game')

router.post('/', game.index)

module.exports = router
