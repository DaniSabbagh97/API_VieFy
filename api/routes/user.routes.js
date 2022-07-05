const { setSalario, setSalarioEmpresa } = require('../../utils/setSalario')
module.exports = (express, config, checkToken, User, HistoricoCuentaParticulares) => {
  const router = express.Router()
  
  router.get('/', checkToken, async (req, res, next) => {
    const response = await User.get(req.body)
    res.json(response)
  })

  router.get('/getSalario', checkToken, async (req, res, next) => {
    const response = await User.getSalario(req.user)
    res.json(response)
  })

  router.post('/setSalario', checkToken, async (req, res, next) => {
    console.log(req.body)
    const response = await User.setSalario(req.body, req.user)
    res.json(response)
  })
  
  router.get('/profile', checkToken, async (req, res, next) => {
    const response = await User.getProfile(req.user)
    res.json(response)
  })
  
  router.post('/putIdclase', checkToken, async (req, res, next) => {
    const response = await User.ponerIdClase(req.body.clave,req.user)
    res.json(response)
    
  })
  
  router.get('/profile/test', checkToken, async (req, res, next) => {
    const salarioAutonomo = await setSalario(req.user.expediente)
    const response = await User.getProfile(req.user)
    await HistoricoCuentaParticulares.insertarSalarioInicial(req.user, salarioAutonomo)
    res.json(response)
  })
  
  router.post('/register', async (req, res, next) => {
    const response = await User.createUser(req.body)
    res.json(response)
  })
  
  router.post('/registrarPropiedad', checkToken, async (req, res, next) => {
    const response = await User.guardarPropiedad(req.body,req.user)
    res.json(response)
  })
  
  router.post('/registrarLocal', checkToken, async (req, res, next) => {
    const response = await User.guardarLocal(req.body,req.user)
    res.json(response)
  })
  
  router.post('/', async (req, res, next) => {
    const response = await User.create(req.body)
    return response
  })
  
  router.post('/pdf', checkToken, async (req, res, next) => {
    const response = await User.insertPDF(req.body, req.user)
    res.json(response)
  })
  
  router.delete('/borrar', async (req, res, next) => {
    const response = await User.borrar(req.body)
    res.json(response)
  })
  
  router.post('/getListUsers', checkToken, async (req, res, next) => {
    const response = await User.getListUsers(req.body)
    res.json(response)
  })
  
  return router
}

// POST http://servidor/api/users/
// http://servidor/api/users

/**
* CRUD
* GET / -> sacar una lista de todo lo que hay (puede estar paginado)
* POST / -> agregar un elemento
* PUT /id -> update de un elemento concreto
* DELETE /id -> eliminar un elemento concreto
* GET /id -> sacar un elemento concreto
*/