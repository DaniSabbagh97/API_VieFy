const { Op } = require('sequelize')

module.exports = (ComprasModel, EmpresasModel, PracticasModel, HistoricoCuentaEmpresasModel) => {
  class Compras {
    async crear(id_practica, user) {
      try {
        const practica = await PracticasModel.findByPk(id_practica)
        const empresa = await EmpresasModel.findByPk(user.id_empresa)

        // Validaciones
        if (!practica) throw new Error('Práctica no encontrada')
        if (!empresa) throw new Error('El ususario no está asignado a una empresa')
        const compra = await ComprasModel.findOne({
          where: {
            id_empresa: user.id_empresa,
            id_practica: id_practica,
          },
          attributes: {
            exclude: ['emtrega'],
          },
        })

        if (empresa.SaldoActual < practica.valorTotal || compra) {
          return false
        } else {
          empresa.SaldoActual -= practica.valorTotal
          await HistoricoCuentaEmpresasModel.create({
            id_empresa: user.id_empresa,
            Saldo: empresa.SaldoActual,
            Gasto: practica.valorTotal,
            Comentario: 'Compra de práctica ' + practica.nombrePractica,
            tipo_gasto: 'Práctica',
            Hora: new Date(),
          })
          await empresa.save()
          await ComprasModel.create({
            id_empresa: user.id_empresa,
            id_practica: id_practica,
            id_clase: user.id_clase,
          })
          return true
        }
      } catch (e) {
        throw e
      }
    }

    async verPracticas(user) {
      try {
        const compras = await ComprasModel.findAll({
          where: {
            id_empresa: user.id_empresa,
          },
          attributes: {
            exclude: ['id_compra', 'id_empresa'],
          },
        })
        const practicas = await PracticasModel.findAll({
          where: {
            id_practicas: {
              [Op.in]: compras.map((c) => c.id_practica),
            },
          },
        })
        return practicas
      } catch (e) {
        throw e
      }
    }

    async entregarPractica(practica, user) {
      try {
        if (!practica || !practica.entrega) throw new Error('Parámetros incorrectos')
        const compra = await ComprasModel.findOne({
          where: {
            id_practica: practica.id_practica,
            id_empresa: user.id_empresa,
          },
        })
        if (!compra) throw new Error('La empresa del usuario no tiene esa práctica comprada')
        compra.entrega = JSON.stringify(practica.entrega)
        await compra.save()
        return true
      } catch (e) {
        throw e
      }
    }

    async obtenerPracticasEntregadas(user) {
      try {
        const compras = await ComprasModel.findAll({
          where: {
            id_clase: user.id_clase,
            entrega: {
              [Op.ne]: null,
            },
            include: [PracticasModel],
          },
        })
        const practicas = []
        compras.forEach((compra) => {
          compra.practica.entrega = JSON.parse(compra.entrega)
          practicas.push(compra.practica)
        })
        return practicas
      } catch (e) {
        throw e
      }
    }

    async corregirPractica(correccion, user) {
      try {
        const compra = await ComprasModel.findOne({
          where: {
            id_practica: correccion.id_practica,
            entrega: {
              [Op.ne]: null,
            },
            include: [PracticasModel],
          },
        })
      } catch (e) {

      }
    }
  }

  return new Compras()
}
