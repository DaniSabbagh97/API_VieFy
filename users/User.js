const encrypter = require('./../auth/encriptString')
const { QueryTypes } = require('sequelize')

module.exports = (UserModel, TestModel, ClasesModel) => {
  
  class User {

    async get() {
      console.log('class User get')
      const users = await UserModel.findAll()
      return users
    }

    async setSalario(userObt, usertoken) {
      console.log(userObt.salario)
      await UserModel.update({
        salario: userObt.salario
      },
      {
        where:{
          id_user: usertoken.id_user
        },
        attributes: {
          exclude: ['imagen', 'contrasenia'],
        },
      })
      return true
    }

    async getSalario(user) {
      console.log(user.id_user)
      const users = await UserModel.findOne({
        where: {
          id_user: user.id_user
        }
      })
      console.log(users.id_user)
      return users
    }
    
    async createUser(user) {
      const passw = await encrypter(user.contrasenia)
      const dbUser = await UserModel.create({
        email: user.email,
        nombre: user.nombre,
        apellidos: user.apellidos,
        contrasenia: passw,
        expediente: user.expediente,
        telefono: user.telefono,
        rol: user.rol,
        rol_juego:user.rol_juego,
        confirmado:user.confirmado,
        imagen: user.imagen,
        isProfe:user.isProfe
      })
      return user.id_user
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
      await UserModel.update({
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
      await UserModel.update({
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
    
    async borrar(user){
      await UserModel.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
      await UserModel.sequelize.query('DELETE FROM users WHERE id_user = '+user.id_user+';',
      {
        type: QueryTypes.DELETE
      })
      console.log(user.id_user)
      return true
    }
    
    async getListUsers(clase){
      console.log(clase.id_clase)
      console.log("BBBBBBBBBBB")
      const usuarios = await UserModel.findAll({
        where: {
          id_clase:clase.id_clase
        }
      })
      console.log("AAAAAAAAAAAAAA")
      console.log(usuarios)
      return usuarios
    }
    
    async ponerIdClase(clave, user){
      const clase = await ClasesModel.findOne({
        where: {
          clave:clave
        }
      })
      console.log(clave)
      if (clase) {
        await UserModel.update({
          id_clase:clase.id_clase
        },{
          where: {
            id_user:user.id_user
          }
        })
        console.log("CORRECTO")
        return clase
      } else{
        console.log("INCORRECTO")
      }
    }

  }
  
  return new User()
  
}