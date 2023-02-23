const router = require('express').Router()
const web = require('./web')

router.get('/', web.index)

module.exports = router
