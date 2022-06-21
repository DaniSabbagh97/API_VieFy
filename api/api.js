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

// USER
const UserModel = require('./../users/UserModel')(database, sequelize)
const TestModel = require('./../test/TestModel')(database, sequelize)
const User = require('./../users/User')(UserModel,TestModel)
const userRoutes = require('./routes/user.routes')(express, config, checkToken, User, HistoricoCuentaParticulares)

// TEST

const Test = require('./../test/Test')(TestModel, UserModel)
const testRoutes = require('./routes/test.routes')(express, config, checkToken, Test)

// PROPIEDADES
const PropiedadesModel = require('./../propiedades/PropiedadesModel')(database, sequelize)
const Propiedades = require('./../propiedades/Propiedades')(PropiedadesModel, TestModel)
const propiedadesRoutes = require('./routes/propiedades.routes')(express, config, checkToken, Propiedades)

//EMPRESAS
const EmpresasModel = require('./../empresas/EmpresasModel')(database, sequelize)
const Empresas = require('./../empresas/Empresas')(EmpresasModel)
const empresasRoutes = require('./routes/empresas.routes')(express, config, checkToken, Empresas)

//SOLICITUDES
const SolicitudModel = require('./../solicitudes/SolicitudModel')(database, sequelize)
const Solicitudes = require('./../solicitudes/Solicitudes')(SolicitudModel)
const solicitudRoutes = require('./routes/solicitudes.routes')(express, config, checkToken, Solicitudes)


// AUTH
const Auth = require('./../auth/Auth')(UserModel, config)
const authRoutes = require('./routes/auth.routes')(express, config, checkToken, Auth)

const app = express()
app.enable('trust proxy')

app.use(express.json())

app.use(crossDomain)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/test', testRoutes)
app.use('/api/historicoCuentaParticulares', historicoCuentaParticularesRoutes)
app.use('/api/propiedades', propiedadesRoutes)
app.use('/api/empresas', empresasRoutes)
app.use('/api/solicitudes', solicitudRoutes)

app.use(errorHandler)

app.listen(config.port)
console.log('API running in ', config.port)