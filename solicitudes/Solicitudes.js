module.exports = (SolicitudModel) => {

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

    }






    return new Solicitudes()

}