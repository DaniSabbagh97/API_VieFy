module.exports = (database, sequelize) => {
  const { DataTypes, Model } = sequelize
  class User extends Model {}

  User.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      nombre: DataTypes.STRING,
      apellidos: DataTypes.STRING,
      contrasenia: DataTypes.STRING,
      expediente: DataTypes.INTEGER,
      telefono: DataTypes.STRING,
      imagen: DataTypes.STRING,
      rol: DataTypes.STRING,
      rol_juego: DataTypes.STRING,
      id_clase: {
        type: DataTypes.INTEGER,
        /* defaultValue: 0*/
      },
      id_empresa: {
        type: DataTypes.INTEGER,
        /* defaultValue: 0*/
      }, //CAMBIAR A INTEGER
      salario: DataTypes.FLOAT,
      confirmado: DataTypes.INTEGER,
      isActive: DataTypes.INTEGER,
      pdf: DataTypes.STRING,
      isProfe: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      id_propiedades: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      saldoActual: DataTypes.FLOAT,
      notificacionTrimestral: DataTypes.TINYINT,
      notificacionAnual: DataTypes.TINYINT,
    },
    {
      sequelize: database,
      timestamps: false,
      modelName: 'users',
      freezeTableName: true,
    }
  )

  return User
}
