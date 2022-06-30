module.exports = (req, res, next) => {
  const jwt = require('jsonwebtoken')
  const config = require('./../config')
  console.log('checking token')
  const token = req.headers['authorization'] || req.body?.token || req.query?.token
  
  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      err.status = 401
      err.success = false
      next(err)
    } else {//el req es los datos que envía el usuario desde android para recibir en la API
      req.user = decoded//Entonces ahora decodeamos el token, porque para hacer el token hemos usado los datos del usuario.
      next()
    }
  })
}