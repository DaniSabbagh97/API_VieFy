module.exports = (PracticasModel) =>{

    class Practicas{



        async subirPractica(practica, profe){
            const practicas = await PracticasModel.create({
                
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
        }
    }
    return new Practicas()
}