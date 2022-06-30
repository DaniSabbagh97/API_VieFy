const encrypter = require('./encriptString')
const jwt = require('jsonwebtoken')
module.exports = (UserModel, config) => {
  class Auth {
    /**
    * Creates new JWT from user already validated
    * @param {{email: string, password: string}} user 
    */
    async getToken(user) {
      try {
        const encryptedPassword = await encrypter(user.contrasenia)//Desencripta la contraseña
        const dbUser = await UserModel.findOne({
          where: { email: user.email, contrasenia: encryptedPassword },//Busca en la BBDD el usuario y la contrasñea encriptado
          attributes: {
            exclude: ['contrasenia']
          },
          raw: true // para que devuelva un usuario plano sin que sea una instancia
        })
        
        if (dbUser) { // validated
          const tokenUser = {...dbUser}
          delete tokenUser.pdf
          delete tokenUser.imagen
          const token = jwt.sign(tokenUser, config.secretKey, { expiresIn: config.tokenExpireSeconds })//elegir a donde va desde el login en la API
          console.log(token)
          return { token, dbUser }//TODO ENVIAR OTRA COSA
        } else { // not validated
          throw new Error('Usuario o contraseña inválidos')
        }
      } catch(e) {
        throw e
      }
    }
  }
  return new Auth()
}