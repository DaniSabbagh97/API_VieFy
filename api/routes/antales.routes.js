module.exports = (express, checkToken, Antales) => {

    const router = express.Router()

    router.get('/', checkToken, async (req, res, next) => {
        try {
            const antales = await Antales.getByClase(req.user)
            res.json(antales)
        } catch(e) {
            next(e)
        }   
    })

    router.post('/', checkToken, async (req, res, next) => {
        try {
            const response = await Antales.create(req.body, req.user)
            res.json(response)
        } catch(e) {
            next(e)
        }   
    })

    return router

}
