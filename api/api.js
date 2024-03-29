const express = require('express')
const sequelize = require('sequelize')

const config = require('./config')
const crossDomain = require('./middlewares/crossDomain')
const checkToken = require('./middlewares/checkToken')
const errorHandler = require('./middlewares/errorHandler')

const { Sequelize } = sequelize
const database = new Sequelize(
  config.database.db,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: 'mariadb',
  }
)

//ASSOCIATIONS

//Test
//database.Test.hasMany(database.User)

// HISTORICO_CUENTAS_PARTICULARES
const HistoricoCuentaParticularesModel = require('./../historicoCuentaParticulares/HistoricoCuentaParticularesModel')(database, sequelize)
const HistoricoCuentaParticulares = require('./../historicoCuentaParticulares/HistoricoCuentaParticulares')(HistoricoCuentaParticularesModel)
const historicoCuentaParticularesRoutes = require('./routes/historicoCuentaParticulares.routes')(express, config, checkToken, HistoricoCuentaParticulares)

// HISTORICO_CUENTAS_EMPRESAS
const HistoricoCuentaEmpresasModel = require('./../historicoCuentaEmpresas/HistoricoCuentaEmpresasModel')(database, sequelize)
const HistoricoCuentaEmpresas = require('./../historicoCuentaEmpresas/HistoricoCuentaEmpresas')(HistoricoCuentaEmpresasModel)
const historicoCuentaEmpresasRoutes = require('./routes/historicoCuentaEmpresas.routes')(express, checkToken, HistoricoCuentaEmpresas)

// USER
const ClasesModel = require('./../clases/ClasesModel')(database, sequelize)
const UserModel = require('./../users/UserModel')(database, sequelize)
const TestModel = require('./../test/TestModel')(database, sequelize)
const User = require('./../users/User')(UserModel, TestModel, ClasesModel)
const userRoutes = require('./routes/user.routes')(express, config, checkToken, User, HistoricoCuentaParticulares)

// TEST

const Test = require('./../test/Test')(TestModel, UserModel)
const testRoutes = require('./routes/test.routes')(express, config, checkToken, Test)

// PROPIEDADES
const PropiedadesModel = require('./../propiedades/PropiedadesModel')(database, sequelize, UserModel)
const Propiedades = require('./../propiedades/Propiedades')(PropiedadesModel, TestModel)
const propiedadesRoutes = require('./routes/propiedades.routes')(express, config, checkToken, Propiedades)

//EMPRESAS
const EmpresasModel = require('./../empresas/EmpresasModel')(database, sequelize, PropiedadesModel)
const Empresas = require('./../empresas/Empresas')(EmpresasModel, UserModel, HistoricoCuentaEmpresasModel)
const empresasRoutes = require('./routes/empresas.routes')(express, config, checkToken, Empresas)

//SOLICITUDES
const SolicitudModel = require('./../solicitudes/SolicitudModel')(database, sequelize, EmpresasModel, UserModel)
const Solicitudes = require('./../solicitudes/Solicitudes')(SolicitudModel, UserModel, EmpresasModel)
const solicitudRoutes = require('./routes/solicitudes.routes')(express, config, checkToken, Solicitudes)

//CLASES

const Clases = require('./../clases/Clases')(ClasesModel)
const clasesRoutes = require('./routes/clases.routes')(express, config, checkToken, Clases)

//PRACTICAS
const PracticasModel = require('./../practicas/PracticasModel')(database, sequelize, UserModel)
const Practicas = require('./../practicas/Practicas')(PracticasModel, UserModel)
const practicasRoutes = require('./routes/practicas.routes')(express, config, checkToken, Practicas)

// ANTALES
const AntalesModel = require('./../antales/AntalesModel')(database, sequelize, EmpresasModel, UserModel)
const Antales = require('./../antales/Antales')(AntalesModel, EmpresasModel, UserModel)
const antalesRoutes = require('./routes/antales.routes')(express, checkToken, Antales)

// AUTH
const Auth = require('./../auth/Auth')(UserModel, config)
const authRoutes = require('./routes/auth.routes')(express, config, checkToken, Auth)

// GASTOS
const GastosFijosModel = require('./../gastos/GastosFijosModel')(database, sequelize)

// MULTAS
const Multas = require('./../multas/Multas')(UserModel, EmpresasModel, HistoricoCuentaEmpresasModel, HistoricoCuentaParticularesModel)
const multasRoutes = require('./routes/multas.routes')(express, checkToken, Multas)

// COMPRAS
const ComprasModel = require('./../compras/ComprasModel')(database, sequelize, EmpresasModel, PracticasModel)
const Compras = require('./../compras/Compras')(ComprasModel, EmpresasModel, PracticasModel, HistoricoCuentaEmpresasModel)
const comprasRoutes = require('./routes/compras.routes')(express, checkToken, Compras)


const app = express()
app.enable('trust proxy')

app.use(express.json({
  limit: "100mb"
}))

app.use(crossDomain)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/test', testRoutes)
app.use('/api/historicoCuentaParticulares', historicoCuentaParticularesRoutes)
app.use('/api/historicoCuentaEmpresas', historicoCuentaEmpresasRoutes)
app.use('/api/propiedades', propiedadesRoutes)
app.use('/api/empresas', empresasRoutes)
app.use('/api/solicitudes', solicitudRoutes)
app.use('/api/clases', clasesRoutes)
app.use('/api/practicas', practicasRoutes)
app.use('/api/antales', antalesRoutes)
app.use('/api/multas', multasRoutes)
app.use('/api/compras', comprasRoutes)

app.use(errorHandler)

app.listen(config.port)
console.log('API running in ', config.port)

// TASKS
const taskManager = require('./TaskManager')(EmpresasModel, UserModel, HistoricoCuentaEmpresasModel, HistoricoCuentaParticularesModel, PropiedadesModel, GastosFijosModel)