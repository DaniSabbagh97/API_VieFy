const encrypter = require('./../auth/encriptString')
const { Op } = require("sequelize")
const { QueryTypes } = require('sequelize')
const { Sequelize } = require('sequelize')
var id

//const res = require('express/lib/response');

module.exports = (UserModel,TestModel) => {

  class User {
    async get() {
      console.log('class User get')
      const users = await UserModel.findAll()
      return users
    }

    async createUser(user) {
      const passw = await encrypter(user.contrasenia)
      
      await UserModel.create({
        email: user.email,
        nombre: user.nombre,
        apellidos: user.apellidos,
        contrasenia: passw,
        expediente: user.expediente,
        telefono: user.telefono,
        rol: user.rol,
        rol_juego:user.rol_juego,
        id_clase:user.id_clase,
        id_empresa:user.id_empresa,
        confirmado:user.confirmado,
        isProfe:user.isProfe
      }).then(user => id =user.id_user)
      console.log(id)
      return id
      
    }

    async getProfile(user){//usuario que reciba en user.routes apartado /profile
      const usuario = await UserModel.findOne({//Promesa 
        where: { id_user: user.id_user }//Busca en la BBDD el id 
    
      })

      return usuario
    }

    async guardarPropiedad(user, usr){
      const id = usr.id_user 
      console.log(user)
      const test = await TestModel.findOne({
        where: {
            id_user:id
        },
        atributes:['Rol']

    })
      const usuario = await UserModel.update({
        id_propiedades: user.id_propiedades,
      },{
        where:{
        id_user: id
        }
      })
      

      return test.Rol;
    }

    async guardarLocal(user, usr){
      const id = usr.id_user 
      console.log(user)
      const test = await TestModel.findOne({
        where: {
            id_user:id
        },
        atributes:['Rol']

    })
      const usuario = await UserModel.update({
        id_propiedades: user.id_propiedades,
      },{
        where:{
        id_user: id
        }
      })
      

      return test.Rol;
    }

    async insertPDF(dato, user){
                   
      await UserModel.update({
        pdf: JSON.stringify(dato),
      },{
          where:{
              id_user:user.id_user
          }
      })
      
      console.log(JSON.stringify(dato))
      return true
  }

  /*async borrar(user){
                   
   await UserModel.destroy({
      where: { id_user: user.id_user }
    }, { 
      truncate: { cascade: true } 
  })
 
    console.log("OOOOO")
    console.log(user.id_user)
    return true
}*/

async borrar(user){
                   
  await UserModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')

  await UserModel.sequelize.query('DELETE FROM users WHERE id_user = '+user.id_user+';',
  {
    type: QueryTypes.DELETE
  })

   console.log("OOOOO")
   console.log(user.id_user)
   return true
}

 /*async getPDF(usr){
            
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
}/*
    

    /*async guardarPropiedad(idProp, idUsr){//UPDATE TONTO
    
      const usuario = await sequelize.query(
        'UPDATE users SET id_propiedades=? WHERE id_user=?',
        {
          replacements: [idProp,idUsr],
          type: QueryTypes.INSERT
        }
      )

      return true;
    }*/

  }


  return new User()

}