const index = (req, res) => {
  const { username } = req.body
  res.render('room', { username })
}

module.exports = {
  index
}
