module.exports = (express, checkToken, HistoricoCuentaEmpresas) => {


    const router = express.Router()

    router.get('/', checkToken, async (req, res, next) => {
        const response = await HistoricoCuentaEmpresas.get(req.body)
        res.json(response)
    })
    
    router.post('/insertarHistorico', checkToken, async (req, res, next) => {
        
    })

    router.get('/saldo', checkToken, async (req, res, next) => {
        const response = await HistoricoCuentaEmpresas.getSaldo(req.user)
        res.json(response)
    })


    return router
}

// POST http://servidor/api/historicoCuentaEmpresas
// http://servidor/api/historicoCuentaEmpresas

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */