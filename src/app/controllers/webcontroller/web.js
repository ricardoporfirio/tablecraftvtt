const index = (req, res) => {
  const chat_list = [
    'Chat 1',
    'Chat 2',
    'Chat 3'
  ]
  res.render('index', { rooms: chat_list })
}

module.exports = {
  index
}
