module.exports = (express, config, checkToken, HistoricoCuentaParticulares) => {


    const router = express.Router()

    router.get('/', checkToken, async (req, res, next) => {
        console.log('Getting HistoricosParticulares')
        const response = await HistoricoCuentaParticulares.get(req.body)
        res.json(response)
    })
    
    router.post('/insertarHistorico', checkToken, async (req, res, next) => {
        
    })

    router.get('/saldo', checkToken, async (req, res, next) => {
        console.log('Getting Saldo')
        const response = await HistoricoCuentaParticulares.getSaldo(req.user)
        res.json(response)
    })


    return router
}

// POST http://servidor/api/historicoCuentaParticulares
// http://servidor/api/historicoCuentaParticulares

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */