const { Op } = require('sequelize')

module.exports = (PropiedadesModel, TestModel) => {
  class Propiedades {
    async get(id) {
      const obtTest = await TestModel.findOne({
        where: {
          id_user: id,
        },
        atributes: ['NHijos'],
      })
      console.log('xd', obtTest.NHijos)
      const propiedades = await PropiedadesModel.findAll({
        where: {
          tipo: 'vivienda',
          Habitaciones: {
            [Op.gte]: obtTest.NHijos,
          },
        },
      })
      return propiedades
    }

    async getLocal() {
      console.log('class Propiedades get')
      const propiedades = await PropiedadesModel.findAll({
        where: {
          tipo: 'local',
        },
      })
      return propiedades
    }

    async crearPropiedad(propiedades) {
      //TODO CREAR PROPIEDADES

      await PropiedadesModel.create({})
      return true
    }
  }

  return new Propiedades()
}
