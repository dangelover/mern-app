const { response } = require("express");
const Evento = require("../models/Evento");

const getEvento = async (req, res = response) => {
  //populate => nos permitemostrar datos a un objeto
  //primer parametro es la referencia o propiedad a la cual queremos mostrar datos
  //segundo parametro: el dato el cual queremos mostrar
  const eventos = await Evento.find().populate("user", "name");
  res.json({
    ok: true,
    eventos,
  });
};
const crearEvento = async (req, res = response) => {
  console.log(req.body);
  const evento = new Evento(req.body);
  try {
    //el id se encuentra , en el req en el objeto uid
    //le pasamos a la propiedaduser el id que viene de la req
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
  res.json({
    ok: true,
    msg: "crearEventos",
  });
};
const actualizarEvento = async (req, res = response) => {
  //obtenemos el id de la url de nuestro evento
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe por ese id",
      });
    }
    //verificamos si la persona que creo este evento es la misma persona que
    //la quiere modificar y actualizar, pero si son diferentes entonces no la podra
    //actualizar
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegio para editar este evento",
      });
    }
    const nuevoEvento = {
      //desestructuramos todo lo que viene de la req.body
      ...req.body,
      //y agregamos el uid del usuario
      user: uid,
    };
    //findByIdAndUpdate(id del evento, nueva data qu quermos guardar,opciones(new:true =>
    //quiero que retorne el evento actualizado en la pantalla))
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};
const eliminarEvento = async (req, res = response) => {
  //obtenemos el id de la url de nuestro evento
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe por ese id",
      });
    }
    //verificamos si la persona que creo este evento es la misma persona que
    //la quiere modificar y actualizar, pero si son diferentes entonces no la podra
    //actualizar
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "no tiene privilegio para eliminar este evento",
      });
    }
    await Evento.findOneAndDelete(eventoId);
    res.json({
      ok: true,
      msg: "evento eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};
module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
