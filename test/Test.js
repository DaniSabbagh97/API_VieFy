module.exports = (TestModel, UserModel, testResult) => {

    class Test{
        async get(){
            console.log('class Test get')
            const test = await TestModel.findAll()
            return test
        }

        async createTest(test, fi, ff){

            await TestModel.create({/*Recibir Test, y hacer select insert con el id_user*/ 
                id_user: test.id_user,
                ImpB2: test.ImpB2,
                ImpB3: test.ImpB3,
                ImpB4: test.ImpB4,
                ImpB5: test.ImpB5,
                ImpB8: test.ImpB8,
                ImpB9: test.ImpB9,
                ImpB10: test.ImpB10,
                ImpB11: test.ImpB11,
                FutC2: test.FutC2,
                FutC3: test.FutC3,
                FutC4: test.FutC4,
                FutC5: test.FutC5,
                FelicidadInicial: fi,
                FelicidadFinalEstimada: ff,
                NHijos: test.NHijos,
                Rol: test.Rol,
                Pareja: test.Pareja
            })
                await UserModel.update({
                    isActive: true,
        },{
            where:{
                id_user:test.id_user
            }
        })
        const idPropU = await UserModel.findOne({
            where: {
                id_user:test.id_user
            },
           // attributes: ['id_propiedades']
        })
        console.log("ZZZZZZZZZZZZZZZZZZ")

        console.log(idPropU)
        return idPropU
    }

    }
    return new Test()
}
