module.exports = (express, config, checkToken, Auth) => {
  const router = express.Router()

  router.post('/', async (req, res, next) => {
    console.log('getting token')
    const response = await Auth.getToken(req.body)
    console.log(response)
    res.json(response)
    
  })

  return router
}

// POST http://servidor/api/users
// http://servidor/api/users

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */