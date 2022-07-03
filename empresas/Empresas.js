const { setSalarioEmpresa } = require('./../utils/setSalario')
const CronJob = require('cron').CronJob
const { Op } = require("sequelize")

module.exports = (EmpresasModel, UserModel, HistoricoCuentaEmpresasModel, HistoricoCuentaParticularesModel) => {
    
    class Empresas{
        
        constructor() {
            console.log('Iniciando automatización de pago de nóminas semanales - Cada lunes a las 00:00')
            this.job = new CronJob(
                '0 0 * * MON',
                async () => {
                    console.log('Pagando nóminas')
                    const users = await UserModel.findAll({
                        where: {
                            [Op.and]: [ // salario distinto de null y mayor que cero, que tenga id_empresa
                                { salario: { [Op.ne]: null } },
                                { salario: { [Op.gt]: 0 } },
                                { id_empresa: { [Op.ne]: null } }
                            ]
                        }
                    })
                    for (const user of users) {
                        const empresa = await EmpresasModel.findByPk(user.id_empresa)
                        if (empresa) {
                            // actualizacíón de la empresa
                            empresa.SaldoActual -= user.salario
                            await empresa.save()
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
                            await user.save()
                            await HistoricoCuentaParticularesModel.create({
                                id_user: user.id_user,
                                Saldo: user.saldoActual,
                                Importe: user.salario,
                                Comentario: null,
                                tipo_gasto: 'nomina',
                                Hora: new Date()
                            })
                        }
                    }   
                    console.log('Nóminas pagadas')
                },
                null,
                true,
                'Europe/Madrid'
            )
        }
        
        async get(){
            console.log('Empresas')
            const empresa = await EmpresasModel.findAll()
            return empresa
        }
        
        async crearEmpresa(empresa, user){
            const dbEmpresa = await EmpresasModel.create({
                nombre: empresa.nombre,  
                dueño: empresa.dueño,  
                SaldoInicial: empresa.SaldoInicial,  
                SaldoActual: empresa.SaldoActual,  
                PagoLocal: empresa.PagoLocal,  
                id_propiedad: empresa.id_propiedad,  
                id_clase: user.id_clase,
                slogan: empresa.slogan,  
                anuncio: empresa.anuncio,  
                cuerpoAnuncio: empresa.cuerpoAnuncio,  
            })
            if (empresa) {
                UserModel.update({
                    id_empresa: dbEmpresa.id_empresa
                }, {
                    where: {
                        id_user: user.id_user
                    }
                })
                const salario = await setSalarioEmpresa(user.expediente)
                HistoricoCuentaEmpresasModel.create({
                    Empresa: empresa.id_empresa,
                    Saldo: salario,
                    Gasto: 0,
                    Comentario: 'Saldo inicial',
                    tipo_gasto: null,
                    Hora: new Date(),
                })
            }
            return true
        }
        
        async getPDF(usr){
            
            const id = usr.id_user
            const empresa = await EmpresasModel.findOne({
                where: {
                    dueño:id
                },
                atributes:['pdfString'],
                raw:true
            })
            
            empresa.pdfString = JSON.parse(empresa.pdfString)
            // console.log(empresa)
            return empresa
        }
        
        async insertPDF(dato, user){
            
            await EmpresasModel.update({
                pdfString: JSON.stringify(dato),
            },{
                where:{
                    dueño:user.id_user
                }
            })
            
            // console.log(user.id_user)
            return true
        }
        
        async getEmpresas(usuario){
            const clase = usuario.id_clase
            console.log(clase)
            const empresas = await EmpresasModel.findAll({
                where: {
                    id_clase:clase
                }
            })
            // empresas.pdfString = JSON.parse(empresas.pdfString)
            console.log("PUTAAAAAA MIERDA QUE LE ENVÍO UN NO STRING Y SE RALLA")
            console.log(empresas)
            return empresas
        }
        
        
    }
    return new Empresas()
}