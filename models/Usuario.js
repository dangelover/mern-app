//desestructuramos mongoose en Schema y model
const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
  //este name sera de tipo String y es requerido
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = model("Usuario", UsuarioSchema);
