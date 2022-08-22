import expres from 'express'
import config from './src/config'
import animeRoute from './src/routes//anime.routes'
import notFound from './src/middlewares/notFound'
import handleError from './src/middlewares/handleError'

const app = expres()

// ? Middleware
app.use(expres.json())

// ? Puerto
app.set('port', config.port)

// ? Ruta principal
app.get('/', (_, res) => {
  res.status(200).json({
    status: true,
    message: 'Api de la pagina de anime Anime Fenix',
    repository: 'https://github.com/MarioSC21/API-Scraper-AnimeFenix',
    endPoints: {
      latest: '/home',
      watch: '/ver/:id',
      info: '/info/:id',
      download: '/download/:id',
      search: '/search/:id'
    },
    endPointsPost: {
      info: 'colocar el nombre de usuario y password de la pagina de animefenix si desea descargar con su usuario',
      download: '/download/:id'
    }
  })
})

// ? Rutas
app.use(animeRoute)

// ? middlewares
app.use(handleError)
app.use(notFound)

export default app
