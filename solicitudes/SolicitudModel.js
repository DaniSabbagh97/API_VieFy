module.exports = (database, sequelize, EmpresasModel, UserModel) => {
  const { DataTypes, Model } = sequelize
  class Solicitudes extends Model {}

  Solicitudes.init(
    {
      id_solicitud: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_empresa: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      pdf: DataTypes.STRING,
      mensaje: DataTypes.STRING,
    },
    {
      sequelize: database,
      timestamps: false,
      modelName: 'solicitudes',
      freezeTableName: true,
    }
  )

  EmpresasModel.hasMany(Solicitudes, {
    foreignKey: 'id_empresa',
  })
  Solicitudes.belongsTo(EmpresasModel, {
    foreignKey: 'id_empresa',
  })

  UserModel.hasMany(Solicitudes, {
    foreignKey: 'id_user',
  })
  Solicitudes.belongsTo(UserModel, {
    foreignKey: 'id_user',
  })

  return Solicitudes
}
