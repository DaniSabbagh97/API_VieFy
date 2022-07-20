module.exports = (express, checkToken, Compras) => {
  const router = express.Router()

  router.post('/', checkToken, async (req, res, next) => {
    try {
      const response = await Compras.crear(req.body.id_practica, req.user)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  router.get('/', checkToken, async (req, res, next) => {
    try {
      const response = await Compras.verPracticas(req.user)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  router.post('/entrega', checkToken, async (req, res, next) => {
    try {
      const response = await Compras.entregarPractica(req.body, req.user)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  router.post('/entregas', checkToken, async (req, res, next) => {
    console.log(req.body.id_clase)
    try {
      const response = await Compras.obtenerPracticasEntregadas(req.body)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  router.post('/corregir', checkToken, async (req, res, next) => {
    try {
      const response = await Compras.corregirPractica(req.body, req.user)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  return router
}
