require('../../engine/chat')

const index = (req, res) => {
  const { username } = req.body
  res.render('room', { username, io: req.app.get('io') })
}

module.exports = {
  index
}
