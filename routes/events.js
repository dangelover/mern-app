//todas tienen que pasar por la validacion del jwt
//obtener eventos
const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
//al hacer uso de esta forma del middleware, le decimos que cualquier peticion que se
//encuentre justo abajo de esto va a tener su token
router.use(validarJWT);
router.get("/", getEvento);
router.post(
  "/",
  [
    check("title", "titulo es obligatorio").not().isEmpty(),
    //el custom espera que le mandemos una funcion o un callback que se ejecutara para validar el campo
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalizacion es obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
router.put("/:id", actualizarEvento);
router.delete("/:id", eliminarEvento);
module.exports = router;
