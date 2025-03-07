const router = require('express').Router()
const { Sequelize } = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
      attributes: ['author', [Sequelize.fn('COUNT', Sequelize.col('id')), 'blogs'], [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes']],
      group: 'author',
      order: [
        ['likes', 'DESC']
      ]
    })
    res.json(blogs)
})

module.exports = router