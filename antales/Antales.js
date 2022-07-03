module.exports = (AntalesModel, EmpresasModel, UserModel) => {
  class Antales {
    async getByClase(id) {
      const idClase = id.id_clase
      try {
        if (!idClase) throw new Error('El usuario no está asignado a una clase')
        const antales = await AntalesModel.findAll({
          where: {
            id_clase: idClase,
          },
          include: [
            {
              model: EmpresasModel,
            },
            {
              model: UserModel,
              attributes: {
                exclude: ['contrasenia', 'pdf'],
              },
            },
          ],
        })
        return antales
      } catch (e) {
        throw e
      }
    }

    async create(antal, user) {
      try {
        if (!antal || !antal.mensaje || !antal.cuenta || !antal.tipo || !antal.beneficio) {
          throw new Error('Campos incorrectos')
        }
        await AntalesModel.create({
          mensaje: antal.mensaje,
          cuenta: antal.cuenta,
          tipo: antal.tipo,
          beneficio: antal.beneficio,
          id_user: user.id_user,
          id_empresa: user.id_empresa,
          id_clase: user.id_clase,
        })
        return true
      } catch (e) {
        throw e
      }
    }
  }

  return new Antales()
}
