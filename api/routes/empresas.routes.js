module.exports = (express, config, checkToken, Empresas) => {
    const router = express.Router()

    router.get('/', checkToken, async (req, res, next) => {
        console.log('getting Empresas')
        const response = await Empresas.get(req.body)
        res.json(response)
    })
    
    router.post('/insertarEmpresa', checkToken, async (req, res, next) => {
        const response = await Empresas.crearEmpresa(req.body)
        res.json(response)
    })

    router.post('/pdf', checkToken, async (req, res, next) => {
        const response = await Empresas.insertPDF(req.body, req.user)
        res.json(response)
    })

    router.get('/getPdf', checkToken, async (req, res, next) => {
        const response = await Empresas.getPDF(req.user)
        res.json(response)
    })

    return router
}

// POST http://servidor/api/empresas
// http://servidor/api/empresas

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */