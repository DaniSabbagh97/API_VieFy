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
    pdf: DataTypes.BLOB,
    pdfString: DataTypes.STRING,
    charpdf: DataTypes.STRING
}, {
    sequelize: database,
    timestamps: false,
    modelName: "empresas"
})
return Empresas

}