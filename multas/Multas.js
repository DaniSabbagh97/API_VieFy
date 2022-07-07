module.exports = (UserModel, EmpresasModel, HistoricoCuentaEmpresas, HistoricoCuentaParticulares) => {
  class Multas {
    /**
     * @param {{ motivo: string, id_user: number, cantidad: number }} multa
     */
    async crear(multa) {
      try {
        if (!multa || !multa.motivo || !multa.id_user || !multa.cantidad) {
          throw new Error('Parámetros incorrectos')
        }
        const user = await UserModel.findByPk(multa.id_user)
        if (!user) return false
        if (user.rol_juego == 'Asalariado') {
          // * Asalariados
          user.saldoActual -= multa.cantidad
          await HistoricoCuentaParticularesModel.create({
            id_user: user.id_user,
            Saldo: user.saldoActual,
            Importe: multa.cantidad,
            Comentario: multa.motivo,
            tipo_gasto: 'Multa',
            Hora: new Date(),
          })
          await user.save()
          return true
        } else {
          // * Empresarios o autónomos
          const empresa = await EmpresasModel.findByPk(user.id_empresa)
          if (empresa) {
            empresa.SaldoActual -= multa.cantidad
            await HistoricoCuentaEmpresasModel.create({
              id_empresa: user.id_empresa,
              Saldo: empresa.SaldoActual,
              Gasto: multa.cantidad,
              Comentario: multa.motivo,
              tipo_gasto: 'Multa',
              Hora: new Date(),
            })
            await empresa.save()
            return true
          } else {
            return false
          }
        }
      } catch (e) {
        throw e
      }
    }
  }

  return new Multas()
}
