module.exports = (express, config, checkToken, Clases) => {

    const router = express.Router()

    router.get('/getClases', checkToken, async (req, res, next) => {

        const response = await Clases.getClases(req.user)
        res.json(response)

        console.log(response)
    })

    router.post('/crearClases', checkToken, async (req, res, next) => {

        const response = await Clases.crearClase(req.body, req.user)
        res.json(response)
        console.log(response)

    })
    router.post('/updateUsos', checkToken, async (req, res, next) => {

        const response = await Clases.updateUsos(req.body)
        res.json(response)
        console.log(response)

    })
    

    return router

}

// POST http://servidor/api/clases/
// http://servidor/api/clases/

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 **/