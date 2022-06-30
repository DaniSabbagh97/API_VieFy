module.exports = (HistoricoCuentaEmpresasModel) => {

    class HistoricoCuentaParticulares {
        async get() {
          console.log('class get HistoricoCuentaParticulares')
          const hcp = await HistoricoCuentaEmpresasModel.findAll()
          return hcp
        }

        async getSaldo(user) {
          const historicoCuenta = await HistoricoCuentaEmpresasModel.findOne({
              where: { 
                id_user: user.id_user
               }

          })

          return historicoCuenta
          
        }

        async insertarSalarioInicial(user, salarioAutonomo) {
          console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAA')
          
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

    return new HistoricoCuentaParticulares()
}
