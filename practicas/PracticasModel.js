module.exports = (database, sequelize) => {
    const { DataTypes, Model } = sequelize
    class Practicas extends Model{}

    Practicas.init({
        id_practica:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombrePractica: DataTypes.STRING,
        numEjercicios: DataTypes.INTEGER,
        valorTotal: DataTypes.INTEGER,
        fechaEntrega: DataTypes.STRING,
        id_clase:DataTypes.INTEGER,
        id_profesor:DataTypes.INTEGER,
        pdf: DataTypes.STRING,
        nota:DataTypes.INTEGER,
        beneficio:DataTypes.INTEGER
    },{
        sequelize: database,
        timestamps: false,
        modelName: "practicas"
    })

    return Practicas

}