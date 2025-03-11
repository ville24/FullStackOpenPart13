const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
    const readinglist = await ReadingList.create(req.body)
    res.json(readinglist)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const reading = await ReadingList.findOne({ where: { userId: req.decodedToken.id, blogId: req.params.id } })
    if (reading) {
        reading.read = req.body.read
        await reading.save()
        res.json(reading)
    } else {
        res.status(404).end()
    }
})

module.exports = router