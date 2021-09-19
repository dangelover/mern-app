const { response } = require("express");
//importacion de la encriptacion
const bcrypt = require("bcryptjs");
//vamos a importar el resultado de la validacion
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
//importamos la funcion para generar el token, esta regresa una promesa que retorna el token
const { generarJWT } = require("../helpers/jwt");
// const bcrypt = require("bcryptjs/dist/bcrypt");
//estos controllers son las funciones que tenemos definidas en los routers
const crearUsuario = async (req, res = response) => {
  //req => lo que la persona solicita
  //res => es lo que nosotros respondemos
  //req.body => extraemos la informacion en objeto que envia el usuario, tal como el name, correo

  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({
      email,
    });
    if (usuario) {
      return res.status(400).json({
        ok: "false",
        msg: "Correo ya registrado",
      });
    }
    //creamos una instancia de Usuario y le pasamos el req.body
    usuario = new Usuario(req.body);
    //Encriptar contraseña
    //salt=> numero o informacion aleatoria que es usado para la encriptacion
    //usamos este metodo sincrono, este recibe un numero de vueltas, mientras mas vueltas
    //mas seguro es pero se hace mas pesado, si dejamos vacio tomara 10 por defecto
    const salt = bcrypt.genSaltSync();
    //luego usamos el metodo hashSync, pide como parametro el password, luego el salt
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    //generar JWT(JSON WEB TOKEN)
    const token = await generarJWT(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }

  //se espera hasta que se graba y va a regresar el documento guardado correctamente o nos va a decir
  //un error

  //en una peticion donde la informacion no es correcta, no debe de regresar status 200
  //porque este significa que se hizo correctamente
  //para este tipo de erroes se retorna un status 400
  //SOLO SE PUEDE HACER UNA RESPUESTA UNA UNICA VEZ
  //   if (name.length < 5) {
  //     //ES POR ELLO QUE AQUI USAMOS EL RETURN
  //     return res.status(400).json({
  //       ok: false,
  //       msg: "el nombre debe de ser de 5 letras",
  //     });
  //   }

  //status 201 => estatus que indica que se creo
};
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({
      email,
    });
    if (!usuario) {
      return res.status(400).json({
        ok: "false",
        msg: "Usuario no existe con ese email",
      });
    }
    //confirmar los passwords
    //usamos el metodo compreSyn, el primer parametro es el password
    //que ha ingresado el usuario, segundo parametro es el password que esta en la base de datos
    //esto regresa un true si es valido o false si no lo es
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }
    //generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.name);
    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el admin",
    });
  }
};
const revalidarToken = async (req, res = response) => {
  //obtenemos el uid de la req
  const uid = req.uid;
  const name = req.name;
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    uid: uid,
    name: name,
    token,
  });
};
module.exports = {
  crearUsuario,
  revalidarToken,
  loginUsuario,
};
