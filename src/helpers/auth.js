const helpers = {}

helpers.estaAutenticado = (req, res, next) => {
  if(req.isAuthenticated()){
    return next()
  }
  req.flash('error_msg', 'No esta autorizado')
  res.redirect('/login')
}

module.exports = helpers
