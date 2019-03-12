const helpers = {}

helpers.obtenerUser = (datos) =>{
  //cambiar a booleano el sexo

  return {
    name:datos.name,
    apellido: datos.apellido,
    email: datos.email,
    sexo:helpers.sexoString(datos.sexo),
    sexoBool: helpers.sexoBooleano(datos.sexo),

    //datos complementarios
    fechaNacimiento: datos.fechaNacimiento,
    dni: datos.dni,
    estadoCivil: (datos.estadoCivil ? datos.estadoCivil.toUpperCase() : 'No Definido'),
    estadoCivilBool: helpers.estadoCivilBool(datos.estadoCivil),
    numeroTelefono:datos.numeroTelefono,
    numeroCelular:datos.numeroCelular
  }
}

//este helpernos ayuda a enviar el sesxo true: si es muejer y false si es Hombre
//est nos ayuda para renderizar la opción en perfilUserDatos1
helpers.sexoBooleano = (sexo) => {
  if(sexo == 'F'){
    return true
  }
  return false
}

helpers.sexoString = (sexo) =>{
  if(sexo == 'F'){
    return 'Femenino'
  }
  return 'Masculino'
}

helpers.estadoCivilBool = (estadoCivil) =>{
  if(estadoCivil == 'casado'){
    return true
  }
  return false
}


module.exports = helpers
