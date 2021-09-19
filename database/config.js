//importamos mongoose
const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    //process.env => esta es nuestra variable env de conexion
    //esto regresa una promesa
    await mongoose.connect(process.env.DB_CNN);
    console.log("db online");
  } catch (e) {
    console.log(e);
    throw new Error("Error a la hora de inicializar base de datos");
  }
};
module.exports = {
  dbConnection,
};
