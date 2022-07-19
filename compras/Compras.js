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

        if (empresa.SaldoActual < practica.valorTotal) {
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
  }

  return new Compras()
}
