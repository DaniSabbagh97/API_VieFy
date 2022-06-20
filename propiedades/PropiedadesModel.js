module.exports = (database, sequelize) => {
    const { DataTypes, Model} = sequelize
    class Propiedades extends Model {}



Propiedades.init({
    id_propiedades:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Nombre: DataTypes.STRING,
    Descripcion: DataTypes.STRING,
    precio: DataTypes.DOUBLE,
    Habitaciones: DataTypes.INTEGER,
    Baños: DataTypes.INTEGER,
    metros_2: DataTypes.INTEGER,
    Planta: DataTypes.STRING,
    zona: DataTypes.STRING,
    municipio: DataTypes.STRING,
    distrito: DataTypes.STRING,
    Terraza: DataTypes.INTEGER,
    Piscina: DataTypes.INTEGER,
    aireAcondicionado: DataTypes.INTEGER,
    Parking: DataTypes.INTEGER,
   // Direccion: DataTypes.STRING,
    img1: DataTypes.STRING,
    img2: DataTypes.STRING,
    img3: DataTypes.STRING,
    tipo: DataTypes.STRING

},{
    sequelize: database,
    timestamps: false,
    modelName: "propiedades"
})
return Propiedades
}