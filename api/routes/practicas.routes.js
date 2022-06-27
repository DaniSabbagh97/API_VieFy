module.exports = (express, config, checkToken, Practicas) => {

    const router = express.Router()

    router.post('/subirPractica', checkToken, async (req, res, next) => {

        const response = await Practicas.subirPractica(req.body, req.user)

        res.json(response)

        console.log(response)

    })

    return router

}

// POST http://servidor/api/practicas/
// http://servidor/api/practicas/subirPractica

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 **/