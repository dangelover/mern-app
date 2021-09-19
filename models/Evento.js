//desestructuramos mongoose en Schema y model
const { Schema, model } = require("mongoose");
const EventoSchema = Schema({
  //este name sera de tipo String y es requerido
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    //Schema.Types.ObjectID => esto le va a decir a mongo
    //que va a hacer una referencia
    type: Schema.Types.ObjectID,
    //y va a ser una referencia a Usuario
    ref: "Usuario",
    required: true,
  },
});
//esto es a la hora de llamar al metodo toJSON es decir a la hora de verlo
EventoSchema.method("toJSON", function () {
  // de esta manera tenemos referencia a todo nuestro objeto EventoSchema
  //que se esta serializando
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});
module.exports = model("Evento", EventoSchema);
