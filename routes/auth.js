// path para usar estas rutas de usuarios => localhost:4000+/api/auth
const express = require("express");
//del express-validator extraemos el middleware check
//este se va a encargar de validar un campo en particular
const { check } = require("express-validator");
//configuramos un router
const router = express.Router();
//importamos de nuestros controllers
const {
  crearUsuario,
  revalidarToken,
  loginUsuario,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/",
  [
    check("email", "el email para el login es obligatorio").isEmail(),
    check("password", "el password del login debe ser 6").isLength({
      min: 6,
    }),
    //llamamos a nuestro middleware
    validarCampos,
  ],
  loginUsuario
);
// router.post("/new",[coleccion de middleware], crearUsuario);
router.post(
  "/new",
  [
    //middlewares
    //check('propiedad a validar','mensaje de error')
    //.not().isEmpty() => de esta forma le indicamos que no debe ser vacio
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);
//toma el jwt y lo verifica, y regresa un nuevo jwt actualizado para el usuario con el objetivo
// de prolongar la duracion
router.get("/renew", validarJWT, revalidarToken);
//exportamos nuestro router
module.exports = router;
