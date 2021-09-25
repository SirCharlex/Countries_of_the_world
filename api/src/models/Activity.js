const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
/*
Actividad Turística con las siguientes propiedades:
ID // Automatico
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)
*/

  sequelize.define('activity', {
   name:{
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
   },
   difficulty:{
     type: DataTypes.ENUM({//Al parecer solo acepta Strings
       values: ['1', '2', '3', '4', '5']
     }),
     allowNull: false,
   },
   duration:{
     type: DataTypes.STRING,
     allowNull: false,
   },
   seasons:{
     type: DataTypes.ENUM({
       values: ['summer', 'fall', 'winter', 'spring']
     }),
     allowNull: false,
   },
   time_type:{
     type: DataTypes.STRING,
     allowNull: false,
   },
  });
};
