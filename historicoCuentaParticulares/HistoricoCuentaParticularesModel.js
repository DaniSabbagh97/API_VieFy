module.exports = (database, sequelize) => {
    const { DataTypes, Model } = sequelize
    class HistoricoCuentaParticulares extends Model {}

    HistoricoCuentaParticulares.init({
    id_historicoParticular :{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: DataTypes.INTEGER,
    Saldo: DataTypes.FLOAT,
    Importe: DataTypes.FLOAT,
    Comentario: DataTypes.STRING,
    tipo_gasto: DataTypes.STRING,
    Hora: DataTypes.DATE,
    
}, {
    sequelize: database,
    timestamps: false,
    modelName: "historicoCuentaParticulares",
    freezeTableName: true,
})
return HistoricoCuentaParticulares

}