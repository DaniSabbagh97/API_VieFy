module.exports = (database, sequelize) => {
    const { DataTypes, Model } = sequelize
    class Clases extends Model{}

    Clases.init({
        id_clase:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        clave: DataTypes.STRING,
        nombre: DataTypes.STRING,
        numero_de_usos: DataTypes.STRING,
        fecha_inicio: DataTypes.STRING,
        fecha_fin: DataTypes.STRING,
        id_user:DataTypes.INTEGER,
        usos: DataTypes.INTEGER
    },{
        sequelize: database,
        timestamps: false,
        modelName: "clases",
        freezeTableName: true,
    })

    return Clases

}