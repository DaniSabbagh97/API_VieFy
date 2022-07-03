const CronJob = require('cron').CronJob
const { Op } = require("sequelize")

module.exports = (EmpresasModel, UserModel, HistoricoCuentaEmpresasModel, HistoricoCuentaParticularesModel, PropiedadesModel) => {
  
  class TaskManager {

    constructor() {
      this.crearTareaSemanal()
      // this.tester()
    }
    
    async tester() {
      const empresa = await EmpresasModel.findByPk(1, {
        attributes: {
          exclude: ['pdfString']
        },
        include: [{
          model: PropiedadesModel,
          as: 'propiedad',
          attributes: {
            exclude: ['zona', 'municipio', 'distrito', 'img1', 'img2', 'img3', 'Descripcion', 'Nombre']
          }
        }]
      })
      console.log(empresa.toJSON())
    }

    crearTareaSemanal() {
      console.log('Iniciando automatización de pago de nóminas y gastos semanales - Cada lunes a las 00:00')
      this.job = new CronJob(
        '0 0 * * MON',
        async () => {
          console.log('Pagando nóminas')
          const users = await UserModel.findAll({ // Alumnos que hayan completado el registro
            where: {
              id_clase: { [Op.ne]: null },
              id_propiedades: { [Op.ne]: null },
              rol: 'Alumno'
            },
            include: [{
              model: PropiedadesModel,
              as: 'propiedad',
              attributes: {
                exclude: ['zona', 'municipio', 'distrito', 'img1', 'img2', 'img3', 'Descripcion', 'Nombre']
              }
            }],
            attributes: {
              exclude: ['pdf', 'imagen', 'expediente', 'nombre', 'apellidos', 'email', 'contrasenia']
            }
          })
          for (const user of users) {
            if (user.id_empresa && empresa) { //? Pago de nóminas
              // actualizacíón de la empresa
              const empresa = await EmpresasModel.findByPk(user.id_empresa, {
                attributes: {
                  exclude: ['pdfString']
                },
                include: [{
                  model: PropiedadesModel,
                  as: 'propiedad',
                  attributes: {
                    exclude: ['zona', 'municipio', 'distrito', 'img1', 'img2', 'img3', 'Descripcion', 'Nombre']
                  }
                }]
              })
              if (empresa) {
                empresa.SaldoActual -= user.salario
                await HistoricoCuentaEmpresasModel.create({
                  id_empresa: user.id_empresa,
                  Saldo: empresa.SaldoActual,
                  Gasto: user.salario,
                  Comentario: null,
                  tipo_gasto: 'nomina',
                  Hora: new Date(),
                })
                // actualizacíón del usuario
                user.saldoActual += user.salario
                await HistoricoCuentaParticularesModel.create({
                  id_user: user.id_user,
                  Saldo: user.saldoActual,
                  Importe: user.salario,
                  Comentario: null,
                  tipo_gasto: 'Nómina',
                  Hora: new Date()
                })
                if (user.rol_juego == 'Empresario' && empresa.propiedad) { //? Gastos de empresarios
                  empresa.SaldoActual -= empresa.propiedad.precio
                  await HistoricoCuentaEmpresasModel.create({
                    id_empresa: user.id_empresa,
                    Saldo: empresa.SaldoActual,
                    Gasto: empresa.propiedad.precio,
                    Comentario: null,
                    tipo_gasto: 'Alquier local',
                    Hora: new Date(),
                  })
                }
                await empresa.save()
              }
            }
            if (user.propiedad) { //? Gastos de particulares
              // * Propiedades
              user.salarioActual -= user.propiedad.precio
              await HistoricoCuentaParticularesModel.create({
                id_user: user.id_user,
                Saldo: user.saldoActual,
                Importe: user.propiedad.precio,
                Comentario: null,
                tipo_gasto: 'Alquiler',
                Hora: new Date()
              })
              // * Lujo
              user.salarioActual -= 100
              await HistoricoCuentaParticularesModel.create({
                id_user: user.id_user,
                Saldo: user.saldoActual,
                Importe: 100,
                Comentario: null,
                tipo_gasto: 'Lujo',
                Hora: new Date()
              })
              // * Alimentación
              const costeAlimentacion = (100 + user.propiedad.precio) * 0.2
              user.salarioActual -= costeAlimentacion
              await HistoricoCuentaParticularesModel.create({
                id_user: user.id_user,
                Saldo: user.saldoActual,
                Importe: costeAlimentacion,
                Comentario: null,
                tipo_gasto: 'Alimentación',
                Hora: new Date()
              })
            }
            await user.save()
          }   
          console.log('Nóminas pagadas')
        },
        null,
        true,
        'Europe/Madrid'
      )
    }

  }

  return new TaskManager()
}
  