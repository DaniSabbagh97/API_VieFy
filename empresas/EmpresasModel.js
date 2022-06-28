module.exports = (database, sequelize) => {
    const { DataTypes, Model } = sequelize
    class Empresas extends Model {}

    Empresas.init({
    id_empresa:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: DataTypes.STRING,
    dueño: DataTypes.INTEGER,
    SaldoInicial: DataTypes.INTEGER,
    SaldoActual: DataTypes.INTEGER,
    PagoLocal: DataTypes.INTEGER,
    id_propiedad: DataTypes.INTEGER,
    slogan: DataTypes.STRING,
    anuncio: DataTypes.STRING,
    cuerpoAnuncio: DataTypes.STRING,
    pdfString: DataTypes.STRING,
    id_clase:DataTypes.INTEGER
}, {
    sequelize: database,
    timestamps: false,
    modelName: "empresas",
    freezeTableName: true,
})
return Empresas

}