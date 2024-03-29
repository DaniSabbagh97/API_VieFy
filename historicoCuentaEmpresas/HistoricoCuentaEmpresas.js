module.exports = (HistoricoCuentaEmpresasModel) => {
  class HistoricoCuentaEmpresas {
    async get() {
      const hcp = await HistoricoCuentaEmpresasModel.findAll()
      return hcp
    }

    async getSaldo(user) {
      const historicoCuenta = await HistoricoCuentaEmpresasModel.findOne({
        where: {
          id_user: user.id_user,
        },
      })
      return historicoCuenta
    }

    async insertarSalarioInicial(user, salarioAutonomo) {
      await HistoricoCuentaEmpresasModel.create({
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

  return new HistoricoCuentaEmpresas()
}
