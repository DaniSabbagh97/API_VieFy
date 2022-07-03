module.exports = (database, sequelize) => {
  const { DataTypes, Model } = sequelize
  class HistoricoCuentaEmpresas extends Model {}

  HistoricoCuentaEmpresas.init(
    {
      id_historico: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_empresa: DataTypes.INTEGER,
      Saldo: DataTypes.FLOAT,
      Gasto: DataTypes.FLOAT,
      Comentario: DataTypes.STRING,
      tipo_gasto: DataTypes.STRING,
      Hora: DataTypes.DATE,
    },
    {
      sequelize: database,
      timestamps: false,
      modelName: 'historicoCuentaEmpresas',
      freezeTableName: true,
    }
  )
  return HistoricoCuentaEmpresas
}
