module.exports = (SolicitudModel, UserModel, EmpresasModel) => {
  class Solicitudes {
    async get() {
      const solicitud = await SolicitudModel.findAll()
      return solicitud
    }

    async addPDF(solicitud, user) {
      await SolicitudModel.create({
        id_empresa: solicitud.id_empresa,
        id_user: user.id_user,
        pdf: JSON.stringify(solicitud.pdf),
        mensaje: solicitud.mensaje,
      })
      return true
    }

    async getLista(user) {
      const empresa = await EmpresasModel.findOne({
        where: {
          id_empresa: user.id_empresa,
        },
        include: {
          model: SolicitudModel,
          include: {
            model: UserModel,
            attributes: {
              exclude: ['contrasenia', 'pdf', 'imagen'],
            },
          },
        },
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

    /**
     * @param {{ id_solicitud: number, salario: number }} parametros
     */
    async contratar(parametros) {
      try {
        if (!parametros || !parametros.id_solicitud || !parametros.salario) {
          throw new Error('Parámetros incorrectos')
        }
        const solicitud = await SolicitudModel.findByPk(parametros.id_solicitud)
        if (!solicitud) throw new Error('Solicitud no encontrada')
        const user = await UserModel.findByPk(solicitud.id_user)
        if (!user) throw new Error('El usuario ligado a esta solicitud no existe')
        user.id_empresa = solicitud.id_empresa
        user.salario = parametros.salario
        await user.save()
        await solicitud.destroy()
        return true
      } catch (e) {
        throw e
      }
    }

    /**
     * @param {{ id_solicitud: number }} parametros
     */
    async eliminar(parametros) {
      try {
        if (!parametros || !parametros.id_solicitud) {
          throw new Error('Parámetros incorrectos')
        }
        const solicitud = await SolicitudModel.findByPk(parametros.id_solicitud)
        if (!solicitud) throw new Error('Solicitud no encontrada')
        await solicitud.destroy()
        return true
      } catch (e) {
        throw e
      }
    }
  }

  return new Solicitudes()
}
