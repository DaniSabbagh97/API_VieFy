module.exports = (express, config, checkToken, Solicitudes) => {

    const router = express.Router()


    router.get('/', checkToken, async (req, res, next) => {
        console.log('Getting Solicitudes')
        const response = await Solicitudes.get(req.body)
        res.json(response)
    })

    router.post('/addPdf', checkToken, async (req, res, next) => {
        console.log('Getting Solicitudes')
        const response = await Solicitudes.addPDF(req.body, req.user)
        res.json(response)
    })

    router.get('/getListaSolicitudes', checkToken, async (req, res, next) => {
        console.log('Getting Solicitudes')
        const response = await Solicitudes.getLista(req.user)
        res.json(response)
    })

    router.post('/contratar', checkToken, async (req, res, next) => {
        try {
            const response = await Solicitudes.contratar(req.body)
            res.json(response)
        } catch(e) {
            res.status(400).json({ success: false, error: e.message })
        }
    })

    router.post('/borrarSolicitud', checkToken, async (req, res, next) => {
        try {
            const response = await Solicitudes.eliminar(req.body)
            res.json(response)
        } catch(e) {
            res.status(400).json({ success: false, error: e.message })
        }
    })



    return router
}
// POST http://servidor/api/solicitudes
// http://servidor/api/solicitudes

/**
 * CRUD
 * GET / -> sacar una lista de todo lo que hay (puede estar paginado)
 * POST / -> agregar un elemento
 * PUT /id -> update de un elemento concreto
 * DELETE /id -> eliminar un elemento concreto
 * GET /id -> sacar un elemento concreto
 */


