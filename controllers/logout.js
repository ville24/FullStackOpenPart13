const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')

const { Session } = require('../models')

router.get('/', tokenExtractor, async (request, response) => {
    const sessions = await Session.findAll({
        where: {
            userId: req.decodedToken.id 
        },
    }) 

    if (sessions[0] ) {
        await sessions[0].destroy()
      }
      res.status(204).end()
})

module.exports = router