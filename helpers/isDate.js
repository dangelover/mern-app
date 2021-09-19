const moment = require("moment");
//esta validacion custom recibe,un value, luego viene un objeto
//que podemos desestructurar lo que es la peticion como tal
//req, location, path
const isDate = (value, { req, location, path }) => {
  //primero vamos a validar el value, sino existe retorna false
  if (!value) {
    return false;
  }
  //usamos la funcion moment y le pasamos el value, de esta forma verificamos
  //si es una fecha o no

  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};
module.exports = {
  isDate,
};
