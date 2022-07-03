const { setSalarioEmpresa } = require('./../utils/setSalario')


module.exports = (EmpresasModel, UserModel, HistoricoCuentaEmpresasModel) => {
    
    class Empresas{
        
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