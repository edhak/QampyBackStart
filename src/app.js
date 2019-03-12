const express = require('express'),
  path = require('path'), //para usar la funcion path y concatenar
  morgan = require('morgan'),
  exphbs = require('express-handlebars'),
  flash = require('connect-flash'),
  session = require('express-session'),
  passport = require('passport'),

  app = express()
  require('./libs/database')
  require('./config/passport')

const usersRoutes = require('./routes/users'),
  especialistasRoutes = require('./routes/especialistas'),
  inicioRoutes = require('./routes/index'), //solo nos lleva al inicio de la pagina
  registroRoutes = require('./routes/registro'),
  historialRoutes = require('./routes/historial')

//inicializaciones importantes db



//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    // helpers:require('./helpers')
    extname:'.hbs'
  }))

app.set('view engine', '.hbs')


//middlewards
app.use(morgan('dev')) //se aplicara en modo desarrollo EN PRODUCCIÓN SE QUITA MORGAN
app.use(express.urlencoded({extended:false}))
// app.use(express.json())

//colocando la session(flash necesita la session para funcionar)
app.use(session({
  secret:'woot',
  resave: true,
  saveUninitialized: true
}))

  //usando passport para la sesion y verificación del login
app.use(passport.initialize())
app.use(passport.session()) //passport necesita session(paquete de express-session)

app.use(flash())


// variables globales con flash
// ver los errores en todos lados
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  //colocanndo lso errores de passport
  res.locals.error = req.flash('error') //lo errores de passport se llaman error
  //los datos del usuario estan en req(solo cuando de autentifican)(y como es variable global podemos acceder de cualquier parte)
  res.locals.user = req.user || null
  // console.log(req.user);
  next()
})


//routes
app.use(inicioRoutes)
app.use(registroRoutes)
app.use(usersRoutes)
app.use(especialistasRoutes)
app.use(historialRoutes)


//static files
app.use(express.static(path.join(__dirname,'public')))


//conexion al servidor
app.listen(app.get('port'), ()=>{
  console.log('server on port', app.get('port'));
})
