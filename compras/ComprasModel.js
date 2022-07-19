module.exports = (database, sequelize, EmpresasModel, PracticasModel) => {
  const { DataTypes, Model } = sequelize
  class Compras extends Model {}

  Compras.init(
    {
      id_compras: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_empresa: DataTypes.INTEGER,
      id_practica: DataTypes.INTEGER,
      id_clase: DataTypes.INTEGER,
      entrega: DataTypes.STRING,
    },
    {
      sequelize: database,
      timestamps: false,
      modelName: 'compras',
      freezeTableName: true,
    }
  )

  EmpresasModel.hasMany(Compras, {
    foreignKey: 'id_empresa',
  })
  Compras.belongsTo(EmpresasModel, {
    foreignKey: 'id_empresa',
  })

  PracticasModel.hasMany(Compras, {
    foreignKey: 'id_practica',
  })
  Compras.belongsTo(PracticasModel, {
    foreignKey: 'id_practica',
  })

  return Compras
}
