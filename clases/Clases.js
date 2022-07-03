module.exports = (ClasesModel) => {
  class Clases {
    async getClases(user) {
      const clases = await ClasesModel.findAll({
        where: {
          id_user: user.id_user,
        },
      })
      return clases
    }

    async crearClase(clase, user) {
      await ClasesModel.create({
        clave: clase.clave,
        nombre: clase.nombre,
        numero_de_usos: clase.numero_de_usos,
        fecha_inicio: clase.fecha_inicio,
        fecha_fin: clase.fecha_fin,
        id_user: user.id_user,
        usos: clase.numero_de_usos,
      })

      return true
    }

    async updateUsos(clase) {
      await ClasesModel.update(
        {
          numero_de_usos: clase.numero_de_usos,
        },
        {
          where: {
            id_clase: clase.id_clase,
          },
        }
      )
      return true
    }
  }

  return new Clases()
}
