const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
/*
País con las siguientes propiedades:
ID (Código de 3 letras) *
Nombre *
Imagen de la bandera *
Continente *
Capital *
Subregión
Área
Población
*/

  sequelize.define('country', {
    alpha:{
      type: DataTypes.STRING(3),
      allowNull: false,
      foreingkey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: { //imagen de la bandera en url
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: { //Continente
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false
    },
    sub_region:{
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.STRING //hay datos que no reconoce al ingresar a la bd con . al ser INTEGER
    },
    population: {
      type: DataTypes.STRING //hay datos que no reconoce al ingresar a la bd con . al ser INTEGER
    },
    // page: {//Agregado para controlar paginación
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // }
  });
};
