const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const { ReadingLists } = require('../models')

router.post('/', async (req, res) => {
    console.log(req.body)
    const readinglists = await ReadingLists.create(req.body)
    res.json(readinglists)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const reading = await ReadingLists.findOne({ where: { userId: req.decodedToken.id, blogId: req.params.id } })
    if (reading) {
        reading.read = req.body.read
        await reading.save()
        res.json(reading)
    } else {
        res.status(404).end()
    }
})

module.exports = router