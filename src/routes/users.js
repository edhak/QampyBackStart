const express = require('express'),
  router = express.Router(),

  User = require("../model/User"),
  {estaAutenticado} = require('../helpers/auth'),
  {obtenerUser} = require('../helpers/datosReq')




router.get('/user', estaAutenticado, (req, res) => {
  res.render('userInicio', obtenerUser(req.user))
  console.log(obtenerUser(req.user));
})



router.get('/perfilUserDatos1', estaAutenticado, (req, res) => {
  // variable bandera
  //en este cosa obtener dato nos devuelve un dato mpas que es sexoBool
  res.render('perfilUserDatos1', obtenerUser(req.user))
})

router.post('/perfilUserDatos1', estaAutenticado, async (req, res) => {
    const {name, apellido, sexo, email} = req.body

    await User.findByIdAndUpdate(req.user._id, {
      name,
      apellido,
      sexo
    })
    // console.log(name,apellido, sexo);
    res.redirect('/user')
})




router.get('/perfilUserDatos2', estaAutenticado, (req, res) => {
  //obtenerUser es un hepers que se encuentra en datosReq
  res.render('perfilUserDatos2', obtenerUser(req.user))
})

router.post('/perfilUserDatos2', estaAutenticado, async (req, res) => {
  const {fechaNacimiento,
    dni,
    estadoCivil,
    numeroTelefono,
    numeroCelular
  } = req.body

  // console.log(req.body);

  await User.findByIdAndUpdate(req.user._id, {
    fechaNacimiento,
    dni,
    estadoCivil,
    numeroTelefono,
    numeroCelular
  })
  // console.log(req.user);
  res.redirect('/user')
})




router.post('perfil', (req, res) => {
  //para actualizar los datos
})


module.exports = router
