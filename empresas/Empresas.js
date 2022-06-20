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
            empresa.pdf=[]
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

       
    }
    return new Empresas()
}