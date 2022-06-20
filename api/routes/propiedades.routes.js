module.exports = (express, config, checkToken, Propiedades) => {
    const router = express.Router()

    router.get('/obtener',checkToken, async (req, res, next) => {
        const id_user = req.user.id_user 
        const response = await Propiedades.get(id_user)
        //console.log(response)
        res.json(response)
    })

    router.get('/obtenerLocal',checkToken, async (req, res, next) => {
        //const id_user = req.user.id_user 
        const response = await Propiedades.getLocal()
        res.json(response)
    })

    /*router.post('/guardar', checkToken, async (req, res, next) => {
        
        const response = await Propiedades.guardarPropiedad(req.body, req.user.id_user)

        console.log(response)
        res.json(response)
    })*/


    


    return router
}

// POST http://servidor/api/propiedades
// http://servidor/api/propiedades

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */