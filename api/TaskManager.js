const CronJob = require('cron').CronJob
const { Op } = require('sequelize')
const moment = require('moment')

module.exports = (
  EmpresasModel,
  UserModel,
  HistoricoCuentaEmpresasModel,
  HistoricoCuentaParticularesModel,
  PropiedadesModel,
  GastosFijosModel
) => {
  class TaskManager {
    constructor() {
      this.crearTareaSemanal()
      this.crearTareaMensual()
      // this.tester()
    }

    async tester() {
      const gastosFijosEmpresarios = await GastosFijosModel.findAll({
        where: {
          rol: 'Empresario',
        },
        raw: true,
      })
      console.log(gastosFijosEmpresarios)
    }

    crearTareaSemanal() {
      console.log('Iniciando automatización de pago de nóminas y gastos mensuales - Cada lunes a las 00:00')
      this.job = new CronJob(
        '0 0 * * MON',
        async () => {
          console.log('Nóminas y gastos mensuales')
          const users = await UserModel.findAll({
            // Alumnos que hayan completado el registro
            where: {
              id_clase: { [Op.ne]: null },
              id_propiedades: { [Op.ne]: null },
              rol: 'Alumno',
            },
            include: [
              {
                model: PropiedadesModel,
                as: 'propiedad',
                attributes: {
                  exclude: ['zona', 'municipio', 'distrito', 'img1', 'img2', 'img3', 'Descripcion', 'Nombre'],
                },
              },
            ],
            attributes: {
              exclude: ['pdf', 'imagen', 'expediente', 'nombre', 'apellidos', 'email', 'contrasenia'],
            },
          })
          for (const user of users) {
            if (user.id_empresa && empresa) {
              // * Pago de nóminas
              // actualizacíón de la empresa
              const empresa = await EmpresasModel.findByPk(user.id_empresa, {
                attributes: {
                  exclude: ['pdfString'],
                },
                include: [
                  {
                    model: PropiedadesModel,
                    as: 'propiedad',
                    attributes: {
                      exclude: ['zona', 'municipio', 'distrito', 'img1', 'img2', 'img3', 'Descripcion', 'Nombre'],
                    },
                  },
                ],
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
                  Hora: new Date(),
                })
                if (user.rol_juego == 'Empresario' && empresa.propiedad) {
                  // * Gastos de empresarios - Propiedades
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
            if (user.propiedad) {
              // * Gastos de particulares - Propiedades
              user.salarioActual -= user.propiedad.precio
              await HistoricoCuentaParticularesModel.create({
                id_user: user.id_user,
                Saldo: user.saldoActual,
                Importe: user.propiedad.precio,
                Comentario: null,
                tipo_gasto: 'Alquiler',
                Hora: new Date(),
              })
              // * Gastos de particulares - Lujo
              user.salarioActual -= 100
              await HistoricoCuentaParticularesModel.create({
                id_user: user.id_user,
                Saldo: user.saldoActual,
                Importe: 100,
                Comentario: null,
                tipo_gasto: 'Lujo',
                Hora: new Date(),
              })
              // * Gastos de particulares - Alimentación
              const costeAlimentacion = (100 + user.propiedad.precio) * 0.2
              user.salarioActual -= costeAlimentacion
              await HistoricoCuentaParticularesModel.create({
                id_user: user.id_user,
                Saldo: user.saldoActual,
                Importe: costeAlimentacion,
                Comentario: null,
                tipo_gasto: 'Alimentación',
                Hora: new Date(),
              })
            }
            const weekOfYear = moment().week()
            if (weekOfYear % 3 == 0) { // cada semana 3 del año
              user.notificacionTrimestral = 1
            }
            if (weekOfYear % 12 == 0) { // cada semana 12 del año
              user.notificacionAnual = 1
            }
            await user.save()
          }
          console.log('Nóminas y gastos mensuales terminados')
        },
        null,
        true,
        'Europe/Madrid'
      )
    }

    crearTareaMensual() {
      console.log('Iniciando automatización de pago anuales - día 1 de cada trimestre a las 01:00')
      this.job = new CronJob(
        '0 1 1 */3 *',
        async () => {
          console.log('Gastos trimestrales')
          const gastosFijosEmpresarios = await GastosFijosModel.findAll({
            where: {
              rol: 'Empresario',
            },
            raw: true,
          })
          const gastosFijosAutonomos = await GastosFijosModel.findAll({
            where: {
              rol: 'Autonomo',
            },
            raw: true,
          })
          const users = await UserModel.findAll({
            // Alumnos que hayan completado el registro
            where: {
              id_clase: { [Op.ne]: null },
              id_propiedades: { [Op.ne]: null },
              rol: 'Alumno',
            },
            include: [
              {
                model: PropiedadesModel,
                as: 'propiedad',
                attributes: {
                  exclude: ['zona', 'municipio', 'distrito', 'img1', 'img2', 'img3', 'Descripcion', 'Nombre'],
                },
              },
            ],
            attributes: {
              exclude: ['pdf', 'imagen', 'expediente', 'nombre', 'apellidos', 'email', 'contrasenia'],
            },
          })
          for (const user of users) {
            if (user.rol_juego == 'Empresario' || user.rol_juego == 'Autonomo') {
              const empresa = await EmpresasModel.findByPk(user.id_empresa, {
                attributes: {
                  exclude: ['pdfString'],
                },
              })
              if (empresa && user.rol_juego == 'Empresario') {
                // * Gastos de Empresarios
                for (const gasto of gastosFijosEmpresarios) {
                  empresa.SaldoActual -= gasto.importe
                  await HistoricoCuentaEmpresasModel.create({
                    id_empresa: user.id_empresa,
                    Saldo: empresa.SaldoActual,
                    Gasto: gasto.importe,
                    Comentario: null,
                    tipo_gasto: gasto.nombre,
                    Hora: new Date(),
                  })
                }
                empresa.save()
              }
              if (empresa && user.rol_juego == 'Autonomo') {
                // * Gastos de Autónomos
                for (const gasto of gastosFijosAutonomos) {
                  empresa.SaldoActual -= gasto.importe
                  await HistoricoCuentaEmpresasModel.create({
                    id_empresa: user.id_empresa,
                    Saldo: empresa.SaldoActual,
                    Gasto: gasto.importe,
                    Comentario: null,
                    tipo_gasto: gasto.nombre,
                    Hora: new Date(),
                  })
                }
                empresa.save()
              }
            }
          }
        },
        null,
        true,
        'Europe/Madrid'
      )
    }
  }

  return new TaskManager()
}
