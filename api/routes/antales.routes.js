module.exports = (express, checkToken, Antales) => {

    const router = express.Router()

    router.post('/get', checkToken, async (req, res, next) => {
        try {
            console.log(req.body)
            console.log("UUUUUUUUUUU")
            const antales = await Antales.getByClase(req.body)
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
