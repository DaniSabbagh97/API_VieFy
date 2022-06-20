module.exports = (PropiedadesModel, TestModel) => {
const { Op } = require("sequelize");
    class Propiedades{
        async get(id){
            console.log('class Propiedades get')
            const obtTest = await TestModel.findOne({
                where: {
                    id_user:id
                },
                atributes:['NHijos']

            })
            console.log("xd",obtTest.NHijos)
            const propiedades = await PropiedadesModel.findAll({
                where: {
                    tipo:"vivienda",
                    Habitaciones:{
                        [Op.gte]: obtTest.NHijos
                    }
                    
                }
            })
            return propiedades
        }

        async getLocal(){
            console.log('class Propiedades get')
            const propiedades = await PropiedadesModel.findAll({
                where: {
                    tipo:"local"                   
                }
            })
            return propiedades
        }

        async crearPropiedad(propiedades){
            //TODO CREAR PROPIEDADES

            await PropiedadesModel.create({

            })
            return true
        }

        /*async guardarPropiedad(propiedades, id){




        }*/



        
    }

    return new Propiedades()


}