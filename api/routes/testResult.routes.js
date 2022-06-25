module.exports = (express, config, User, Test)=>{
    const router = express.Router()

    router.post('/registerTest', checkToken, async (req, res, next) => {
        console.log('registering test')
        
        const response = await Test.createTest(req.body)

        res.json(response)
    })
    return router

}

// POST http://servidor/api/testResult
// http://servidor/api/testResult

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */