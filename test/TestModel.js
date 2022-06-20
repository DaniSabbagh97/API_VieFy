module.exports = (database, sequelize) => {
    const { DataTypes, Model } = sequelize
    class Test extends Model {}

Test.init({
    id_test:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: DataTypes.INTEGER,
    ImpB2: DataTypes.INTEGER,
    ImpB3: DataTypes.INTEGER,
    ImpB4: DataTypes.INTEGER,
    ImpB5: DataTypes.INTEGER,
    ImpB8: DataTypes.INTEGER,
    ImpB9: DataTypes.INTEGER,
    ImpB10: DataTypes.INTEGER,
    ImpB11: DataTypes.INTEGER,
    FutC2: DataTypes.INTEGER,
    FutC3: DataTypes.INTEGER,
    FutC4: DataTypes.INTEGER,
    FutC5: DataTypes.INTEGER,
    FelicidadInicial:DataTypes.DOUBLE,
    FelicidadFinalEstimada: DataTypes.DOUBLE,
    NHijos: DataTypes.INTEGER,
    Rol: DataTypes.STRING,
    Pareja:DataTypes.STRING
}, {
    sequelize: database,
    timestamps: false,
    modelName: "test"
})
return Test

}