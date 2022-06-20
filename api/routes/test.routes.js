module.exports = (express, config, checkToken, Test) => {
    const router = express.Router()
    const felicidadInicial = require('../../utils/setFelicidadInicial')
    const felicidadFinal = require('../../utils/setFelicidadFinal')
    
    router.post('/registerTest', checkToken, async (req, res, next) => {

        
        const fi = await felicidadInicial(req.body, req.user.expediente)
        const ff = await felicidadFinal(req.body, req.user.expediente)



        const response = await Test.createTest(req.body, fi, ff)

        
        
        console.log("xd",response)

        res.json(response)
        
    })
    return router
}


// POST http://servidor/api/test
// http://servidor/api/test

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */