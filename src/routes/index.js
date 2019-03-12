const express = require('express'),
  router = express.Router()

// require('passport')


router.get('/', (req, res) => {
  res.render('index',{title:"!!!!Pagina principal Title"})
})

module.exports = router
