const router = require('express').Router()
const { Sequelize } = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  console.log(Sequelize)
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

//  SELECT "author", count("id") AS "blogs", sum("likes") AS "likes" FROM "blogs" GROUP BY "author";