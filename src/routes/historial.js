const express = require('express'),
  router = express.Router(),

  Historial = require('../model/Historial')


router.get('/historial', (req, res) => {
  res.render('userHistorial')
})


router.get('/historial/new', (req, res) => {
  res.render('userHistorialNew')
})

router.get('/historial/parametrosQampy', (req, res) => {
  res.render('parametrosQampy')
})



module.exports = router
