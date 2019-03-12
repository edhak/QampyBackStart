const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../model/User')

  passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  const user = await User.findOne({email: email})
  console.log(user);
  // if(err){
  // console.log(err);
  // }
  if(!user){
    //null no hay ningun error
    return done(null, false, {message: 'No existe el usuario'})
  }else{
    const match = await user.matchPassword(password)
    // console.log(user);
    if(match){
      return done(null, user)
    }else{
      return done(null, false,{massage: 'Contraseña Incorrecta'})
    }
  }
}))

passport.serializeUser((user, done) => {
  console.log('inicializando usuario');
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})
