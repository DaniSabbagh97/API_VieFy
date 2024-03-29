module.exports = (HistoricoCuentaParticularesModel) => {
  class HistoricoCuentaParticulares {
    async get() {
      const hcp = await HistoricoCuentaParticularesModel.findAll()
      return hcp
    }

    async getSaldo(user) {
      const historicoCuenta = await HistoricoCuentaParticularesModel.findOne({
        where: {
          id_user: user.id_user,
        },
      })

      return historicoCuenta
    }

    async insertarSalarioInicial(user, salarioAutonomo) {

      await HistoricoCuentaParticularesModel.create({
        id_user: user.id_user,
        Saldo: salarioAutonomo,
        Gasto: 'NULL',
        Comentario: 'Generar saldo inicial',
        tipo_gasto: 'NULL',
        Hora: new Date().toISOString(),
      })
      return true
    }
  }

  return new HistoricoCuentaParticulares()
}
