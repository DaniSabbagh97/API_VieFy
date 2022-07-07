module.exports = (express, checkToken, Multas) => {
  const router = express.Router()

  router.post('/', checkToken, async (req, res, next) => {
    try {
      if (req.user.rol != 'Profesor') {
        throw new Error('No tienes permisos para realizar esta acción')
      }
      const response = await Multas.crear(req.body)
      res.json(response)
    } catch (e) {
      next(e)
    }
  })

  return router
}
