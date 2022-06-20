module.exports = (database, sequelize) => {
  const { DataTypes, Model } = sequelize
  class User extends Model {}

  User.init({
    id_user:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }, 
    email: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    contrasenia: DataTypes.STRING,
    expediente: DataTypes.INTEGER,
    telefono: DataTypes.STRING,
    rol: DataTypes.STRING,
    rol_juego: DataTypes.STRING,
    id_clase:DataTypes.STRING,//CAMBIAR A INTEGER
    id_empresa: DataTypes.STRING,//CAMBIAR A INTEGER
    salario:DataTypes.STRING,
    confirmado: DataTypes.INTEGER,
    isActive: DataTypes.INTEGER,
    id_propiedades: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    } 
    
  }, {
    sequelize: database,
    timestamps: false,
    modelName: "user"
  })

  return User
}
