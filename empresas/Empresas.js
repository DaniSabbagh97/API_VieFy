module.exports = (EmpresasModel) => {

    class Empresas{
        async get(){
            console.log('Empresas')
            const empresa = await EmpresasModel.findAll()
            return empresa
        }

        async crearEmpresa(empresa){
            await EmpresasModel.create({
              nombre: empresa.nombre,  
              dueño: empresa.dueño,  
              SaldoInicial: empresa.SaldoInicial,  
              SaldoActual: empresa.SaldoActual,  
              PagoLocal: empresa.PagoLocal,  
              id_propiedad: empresa.id_propiedad,  
              slogan: empresa.slogan,  
              anuncio: empresa.anuncio,  
              cuerpoAnuncio: empresa.cuerpoAnuncio,  

            })
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
                    id_clase:1//CAMBIAR
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