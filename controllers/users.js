const router = require('express').Router()

const { User, Blog, ReadingLists } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({    
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.get('/:id', async (req, res) => {
  let where = {}

  if (req.query.read) {
    where = { read: req.query.read }   
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId'] },
        through: { attributes: ['read', 'id'] },
        include: [
          {
            model: ReadingLists,
            where: where,
            required: false,
          },
        ]
      }]
  })
  if (user) {
    res.json({
      username: user.username,
      name: user.name,
      readings: user.readings.forEach(reading => { return {
        id: reading.id,
        url: reading.url,
        title: reading.title,
        author: reading.author,
        likes: reading.likes,
        year: reading.year,
        readinglists: [
          {
            read: reading.readinglists.read,
            id: reading.readinglists.read,
          }
        ]
      }})
    })
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    user.name = req.body.name
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router