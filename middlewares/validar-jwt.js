const { response } = require("express");
const jwt = require("jsonwebtoken");
const validarJWT = (req, res = response, next) => {
  //pedir en x-tokens en los headers
  const token = req.header("x-token");
  //   console.log(token);
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }
  try {
    //extraemos el payload porque queremos obtener el id y el name
    //en la firma del token tambien esta todos los datos que se grabaron en el payload
    //la firma tambien verifica que el paylodad este igual como este generado, cualquier cambio
    //al payload invalida el token
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // console.log(payload);
    //vamos a pasarle el id del token del usuario al req para que pueda ser usado por los demas
    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};
module.exports = {
  validarJWT,
};
