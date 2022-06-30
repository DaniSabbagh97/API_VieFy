module.exports = (PracticasModel, UserModel) =>{
    
    class Practicas{
        
        async subirPractica(practica, profe){
            try {
                await PracticasModel.create({
                    nombrePractica: practica.nombrePractica,
                    numEjercicios: practica.numEjercicios,
                    valorTotal: practica.valorTotal,
                    fechaEntrega: practica.fechaEntrega,
                    id_clase: practica.id_clase,
                    id_profesor: profe.id_user,
                    pdf: JSON.stringify(practica.pdf),
                    beneficio: practica.beneficio
                })
                return true
            } catch(e) {
                throw e
            }
        }

        async get(user) {
            try {
                const practicas = await PracticasModel.findAll({
                    where: {
                        id_clase: user.id_clase
                    },
                    include: [{
                        model: UserModel,
                        attribute: {
                            exclude: ['contrasenia', 'pdf']
                        }
                    }]
                })
                return practicas
            } catch(e) {
                throw e
            }
        }
    }
    return new Practicas()
}