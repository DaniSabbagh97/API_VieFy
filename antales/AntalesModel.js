module.exports = (database, sequelize, EmpresasModel, UserModel) => {
    const { DataTypes, Model } = sequelize
    class Antales extends Model{}

    Antales.init({
        id_antales:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: DataTypes.STRING,
        mensaje: DataTypes.STRING,
        cuenta: DataTypes.INTEGER,
        beneficio:DataTypes.INTEGER,
        id_user:DataTypes.INTEGER,
        id_empresa: DataTypes.INTEGER,
        id_clase:DataTypes.INTEGER,
    },{
        sequelize: database,
        timestamps: false,
        modelName: "antales",
        freezeTableName: true,
    })

    EmpresasModel.hasMany(Antales, {
        foreignKey: 'id_empresa'
    })
    Antales.belongsTo(EmpresasModel, {
        foreignKey: 'id_empresa'
    })

    UserModel.hasMany(Antales, {
        foreignKey: 'id_user'
    })
    Antales.belongsTo(UserModel, {
        foreignKey: 'id_user'
    })

    return Antales
}