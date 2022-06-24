module.exports = (ClasesModel) => {

    class Clases {

        async getClases(){

            const clases = await ClasesModel.findAll()
            console.log(clases)
            console.log("XXXXXXXXXXXXXXXXX2")
            return clases
        }

        async crearClase(clase,user){
            const clases = await ClasesModel.create({

                clave: clase.clave,
                nombre: clase.nombre,
                numero_de_usos: clase.numero_de_usos,
                fecha_inicio: clase.fecha_inicio,
                fecha_fin: clase.fecha_fin,
                id_user: user.id_user,
                usos: clase.numero_de_usos

            })

            return true
        }


    }

    return new Clases()
}
