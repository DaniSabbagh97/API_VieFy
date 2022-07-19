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

  return router
}
