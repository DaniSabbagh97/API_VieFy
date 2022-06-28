module.exports = (SolicitudModel, UserModel, EmpresasModel) => {

    class Solicitudes {

        async get() {
            console.log('class Solicitud get')
            const solicitud = await SolicitudModel.findAll()
            return solicitud
          }

        async addPDF(solicitud, user){
            await SolicitudModel.create({
                id_empresa: solicitud.id_empresa,
                id_user: user.id_user,
                pdf: JSON.stringify(solicitud.pdf),
                mensaje: solicitud.mensaje
            })
            console.log("IIIIIIIIIIIIIIIIII")
            console.log(user.id_user)
            console.log(solicitud.id_user)
            return true
        }

        async getLista(user){
            console.log(user.id_user)
            
            const empresa = await EmpresasModel.findOne({
                where: {
                    id_empresa: user.id_empresa
                },
                include: {
                    model: SolicitudModel,
                    include: {
                        model: UserModel,
                        attributes: {
                            exclude: ['contrasenia', 'pdf', 'imagen']
                        }
                    }
                }
            })

            if (empresa) {
                for (const solicitud of empresa.solicitudes) {
                    if (solicitud.pdf) {
                        solicitud.pdf = JSON.parse(solicitud.pdf)
                    }
                }
            }

            return empresa
        }

    }


    return new Solicitudes()

}