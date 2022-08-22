import { Router } from 'express'
import { pageHome } from '../controllers/home.controller'
import { verAnime } from '../controllers/verAnime.controller'
import { infoAnime } from '../controllers/infoAnime.controllers'
import { searchAnime } from '../controllers/searchAnime.controller'
import { DowloadAnimeUser, DowloadAnime } from '../controllers/download.controleer'
const router = Router()

router.get('/home', pageHome)
router.get('/ver/:id', verAnime)
router.get('/info/:id', infoAnime)
router.get('/download/:id', DowloadAnime)
router.get('/search/:id', searchAnime)
router.post('/download/:id', DowloadAnimeUser)
export default router
