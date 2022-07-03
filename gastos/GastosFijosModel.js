module.exports = (database, sequelize) => {
  const { DataTypes, Model } = sequelize
  class GastosFijos extends Model {}

  GastosFijos.init(
    {
      id_gastosFijos: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rol: DataTypes.STRING,
      nombre: DataTypes.FLOAT,
      importe: DataTypes.FLOAT,
    },
    {
      sequelize: database,
      timestamps: false,
      modelName: 'gastosFijos',
      freezeTableName: true,
    }
  )

  return GastosFijos
}
