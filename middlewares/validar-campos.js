const { response } = require("express");
const { validationResult } = require("express-validator");
//es muy parecido a los controllers
const validarCampos = (req, res = response, next) => {
  //----MANEJO DE ERRORES
  //mediante esta funcion obtenemos un objeto con todos los parametros que necesitamos para
  //saber si hay errores o no
  //para ello es necesario pasarle como parametro al req
  const errors = validationResult(req);
  //si hay errores entonces
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  //next=> funcion que tenemos que llamar si este middleware se ejecuta correctamente
  next();
};
module.exports = {
  validarCampos,
};
