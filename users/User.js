const encrypter = require('./../auth/encriptString')
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
//const res = require('express/lib/response');
var id
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
        confirmado:user.confirmado
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