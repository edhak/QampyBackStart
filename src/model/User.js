const mongoose = require('mongoose')
const {Schema} = mongoose
const bcrypt = require('bcryptjs')


const UserSchema = new Schema({
  name : {type: String, required: true},
  apellido : {type:String, required: true},
  email: {type:String, required:true},
  password: {type: String, required:true},
  sexo:{type: String, require:true},
  atyc:{type:String, require:true},
  date: {type: Date, default:Date.now},

  //para datos complementarios
  fechaNacimiento : {type:Date},
  dni:{type:String},
  estadoCivil:{type:String},
  numeroTelefono: {type:String},
  numeroCelular:{type:String}

  //datos de Ubicación
})


UserSchema.methods.encriptarPassword = async (password) => {
  const salt = await bcrypt.genSalt(10) //numeros de veces que se procesa el algoritmo
  const hash = bcrypt.hash(password, salt)

  return hash
}

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password) //this.password hace refencia al de UserSchema (solo usado en ECMAscript6
}


module.exports = mongoose.model('User', UserSchema)
