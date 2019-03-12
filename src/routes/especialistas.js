const express = require('express'),
  router = express.Router()

router.get('/especialistas', (req,res) => {
  res.send('conectado a especialistas')
})

module.exports = router
