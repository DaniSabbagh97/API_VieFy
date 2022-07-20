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
          include: [PracticasModel],
        })
        compras.forEach((compra) => {
          compra.entrega = JSON.parse(compra.entrega)
          compra.practica.pdf = JSON.parse(compra.practica.pdf)
        })
        return compras
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
            nota: {
              [Op.is]: null
            },
          },
          include: [PracticasModel],
        })
        compras.forEach((compra) => {
          compra.entrega = JSON.parse(compra.entrega)
          compra.practica.pdf = JSON.parse(compra.practica.pdf)
        })
        return compras
      } catch (e) {
        throw e
      }
    }

    /**
     * @param {{ id_compra: number, nota: number }} correccion
     */
    async corregirPractica(correccion, user) {
      try {
        if (!correccion || !correccion.id_compra || !correccion.nota) throw new Error('Parámetros incorrectos')
        const compra = await ComprasModel.findByPk(correccion.id_compra, {
          include: [PracticasModel],
        })
        if (!compra || !compra.id_empresa) throw new Error('Compra no encontrada o sin empresa asignada')
        const empresa = await EmpresasModel.findByPk(compra.id_empresa)
        if (!empresa) throw new Error('La Empresa asignada a la compra no existe')
        if (compra.practica) {
          const beneficio = (compra.practica.beneficio / 10) * correccion.nota
          empresa.SaldoActual += beneficio
          await HistoricoCuentaEmpresasModel.create({
            id_empresa: user.id_empresa,
            Saldo: empresa.SaldoActual,
            Gasto: beneficio,
            Comentario: 'Beneficio de práctica ' + practica.nombrePractica,
            tipo_gasto: 'Beneficio práctica',
            Hora: new Date(),
          })
          await empresa.save()
        }
      } catch (e) {
        throw e
      }
    }
  }

  return new Compras()
}
