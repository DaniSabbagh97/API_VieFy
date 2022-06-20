const salario = require('../../utils/setSalario')
module.exports = (express, config, checkToken, User, HistoricoCuentaParticulares) => {
  const router = express.Router()

  router.get('/', checkToken, async (req, res, next) => {
    console.log('getting users')
    const response = await User.get(req.body)
    res.json(response)
  })
//
  router.get('/profile', checkToken, async (req, res, next) => {
    console.log('getting user')
    /*const salarioAutonomo = await salario(req.user.expediente)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(salarioAutonomo)*/

    
    const response = await User.getProfile(req.user)//importante hacer
    console.log(response)
    /*const id = req.user.id_user
    const a = await HistoricoCuentaParticulares.insertarSalarioInicial(req.user, salarioAutonomo)*/
    //llamar a setSalario(response.getExpediente)
    
    console.log(response)//TODO OBTENER EXPEDIENTE PARA HACER EL CALCULO DE SALARIO Y SALARIO_EMPRESARIO 
    res.json(response)//devuelto en json
  })

  router.get('/profile/test', checkToken, async (req, res, next) => {
    console.log('getting user')
    const salarioAutonomo = await salario(req.user.expediente)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(salarioAutonomo)

    
    const response = await User.getProfile(req.user)//importante hacer
    console.log(response)
    const id = req.user.id_user
    const a = await HistoricoCuentaParticulares.insertarSalarioInicial(req.user, salarioAutonomo)
    //llamar a setSalario(response.getExpediente)
    
    console.log(response)//TODO OBTENER EXPEDIENTE PARA HACER EL CALCULO DE SALARIO Y SALARIO_EMPRESARIO 
    res.json(response)//devuelto en json
  })

  router.post('/register', async (req, res, next) => {
    console.log('registering user')
    
    const response = await User.createUser(req.body)
    
    res.json(response)
  })

  router.post('/registrarPropiedad', checkToken, async (req, res, next) => {
    console.log('registrando propiedad en usuario')
    //const id = req.user.id_user 
    console.log(req.body)
    const response = await User.guardarPropiedad(req.body,req.user)

    console.log(response)
    res.json(response)
})

router.post('/registrarLocal', checkToken, async (req, res, next) => {
  console.log('registrando propiedad en usuario')
  //const id = req.user.id_user 
  console.log(req.body)
  const response = await User.guardarLocal(req.body,req.user)

  console.log(response)
  res.json(response)
})

  router.post('/', async (req, res, next) => {
    const response = await User.create(req.body)
    return response
  })

  return router
}

// POST http://servidor/api/users/profile
// http://servidor/api/users

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */