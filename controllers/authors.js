const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        group: 'author',
        attributes: ['author', [sequelize.fn('COUNT', sequelize.col('blogs')), 'n_blogs'], [sequelize.fn('SUM', sequelize.col('likes')), 'n_likes']],
        order: [
          ['likes', 'DESC']
        ]
    })
    es.json(blogs)
})

module.exports = router