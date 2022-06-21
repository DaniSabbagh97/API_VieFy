module.exports = (database, sequelize) => {

    const { DataTypes, Model } = sequelize
    class Solicitudes extends Model {}

    Solicitudes.init({
        id_solicitud:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_empresa: DataTypes.INTEGER,
        id_user: DataTypes.INTEGER,
        pdf: DataTypes.STRING,
        mensaje: DataTypes.STRING
    },{
        sequelize: database,
        timestamps: false,
        modelName: "solicitudes"
    })

    return Solicitudes

}