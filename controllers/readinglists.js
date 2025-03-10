const router = require('express').Router()

const { ReadingLists } = require('../models')

router.post('/', async (req, res) => {
    console.log(req.body)
    const readinglists = await ReadingLists.create(req.body)
    res.json(readinglists)
})

module.exports = router