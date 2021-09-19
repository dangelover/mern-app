const jwt = require("jsonwebtoken");
//recibe lo que necesitamos colocar como payload
const generarJWT = (uid, name) => {
  //generamos una neuva promesa
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    //generamos el token
    //usamos este metodo para firmar el token
    //primer parametro=> payload
    //segundo parametro => secret o private key ( palabra unica complicada que ayuda
    //al backen saber si el token es el que yo genere, este se encuentra en el env)
    //tercer parametro => duracion del token
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      //cuando ya se firma entonces llamara al callback, en el cual tendremos un error
      //si esque no se pudo generar
      (err, token) => {
        //si hay algun error entonces nos mostrara el error
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        //si todo lo hace bien mostrara el token
        resolve(token);
      }
    );
  });
};
module.exports = {
  generarJWT,
};
