import expres from 'express'
import config from './src/config'
import animeRoute from './src/routes//anime.routes'

const app = expres()

// ? Middleware
app.use(expres.json())

// ? Puerto
app.set('port', config.port)

// ? Ruta principal
app.get('/', (_, res) => {
  res.status(200).json({
    status: true,
    message: 'server on'
  })
})

// ? Rutas
app.use(animeRoute)

export default app
