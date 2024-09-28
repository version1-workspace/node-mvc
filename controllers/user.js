const User = require('../models/user')

const index = (req, res) => {
  const users = User.findAll()

  res.end(JSON.stringify({ data: users }))
}

const show = (req, res) => {
  const { id } = req.params

  const user = User.find(id)

  if (user) {
    res.end(JSON.stringify({ data: user }))
  } else {
    res.writeHead(404)
    res.end(JSON.stringify({ message: 'User not found' }))
  }
}

const create = (req, res) => {
  const body = req.body

  const user = User.create(body)
  if (user) {
    res.writeHead(201)
    res.end(JSON.stringify({}))
  } else {
    res.writeHead(400)
    res.end(JSON.stringify({ message: 'User not created' }))
  }
}

const update = (req, res) => {
  const { id } = req.params
  const user = User.find(id)
  if (!user) {
    res.writeHead(404)
    res.end(JSON.stringify({ message: 'User not found' }))
    return
  }

  const body = req.body
  Object.assign(user, body)
  user.save()

  res.writeHead(200)
  res.end(JSON.stringify({ data: user }))
}

const destroy = (req, res) => {
  const { id } = req.params
  const user = User.find(id)
  if (!user) {
    res.writeHead(404)
    res.end(JSON.stringify({ message: 'User not found' }))
    return
  }

  user.destroy()
  res.writeHead(200)
  res.end(JSON.stringify({ data: user }))
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}
