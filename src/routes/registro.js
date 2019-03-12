const express = require('express'),
  // mongoose = require('mongoose'),
  User = require('../model/User'),
  passport = require('passport'),
  router = express.Router()

// require('passport')

//rutas del login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local',{
  successRedirect: '/user',
  failureRedirect: '/login',
  failureFlash: true
}))



//rutas del registro
router.get('/registro', (req, res) => { //solo riderecciona para elegir la opción
  res.render('escogerRegistro')
})

router.get('/registroUser', (req, res) => {//singup para usuairos en general
  res.render('formUser')
})



router.post('/registroUser', async (req, res) => { //para guardar los datos de formUser
  const {name, apellido, sexo, email, password,confirm_password, atyc} = req.body
  const errors = []

  console.log(req.body);
  if(name.length <= 0){
    errors.push({text: "Debe Ingresar su nombre"})
  }
  if(password !== confirm_password){
    errors.push({text: "Las contraseñas no coinciden"})
  }
  if(password.length < 6){
    errors.push({text:"su contraseña debe ser mayor a 6 caracteres"})
  }
  //sex retorna un valor en caso enxita en caso contrario no regresea nada
  if(sexo === 'undefined' || sexo === null || sexo === false ){
    errors.push({text:"seleccione su Sexo"});
  }
  //atyc acepto terminos y condicione
  //atyx retorna un valor en caso contrario no retorna nada
  if(!atyc){
    errors.push({text:"Tienes que aceptar los Terminos y Condiciones"});
  }

  if(errors.length > 0){
    //enviamos nuevamente al formulario
    // console.log(errors);
    res.render('formUser', {errors, name, apellido, sexo, email, password,confirm_password, atyc})
  }else{
    const emailUser = await User.findOne({email: email}) //buscamos una igualdad con un email en la base de datosreturn un boolean
    if(emailUser){
      req.flash('error_msg', 'El correo ya esta en uso')
      res.redirect('/registroUser')
    }else{
      //atyc acepto terminos y condiciones
      const newUser = new User({name, apellido, sexo, email, password, atyc})
      //encryptar el password normal
      newUser.password = await newUser.encriptarPassword(password)
      console.log(newUser);
      await newUser.save()
      req.flash('success_msg', 'Te registraste con exito')
       //poner mensaje de exito
      res.render('bienvenidaUser',{name: newUser.name})
    }
  }
})




router.get('/registroDoctor', (req, res) => { //singup para especialistas
  res.render('formDoctor')
})



//cerrar sesion
router.get('/salir', (req, res) => {
  req.logout()
  res.redirect('/')
})


module.exports = router
