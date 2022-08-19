import { Router } from 'express'
import { pageHome } from '../controllers/home.controller'
import { verAnime } from '../controllers/verAnime.controller'
import { infoAnime } from '../controllers/infoAnime.controllers'
import { DowloadAnimeUser } from '../controllers/download.controleer'
const router = Router()

router.get('/home', pageHome)
router.get('/ver/:id', verAnime)
router.get('/info/:id', infoAnime)
router.post('/download/:id', DowloadAnimeUser)
export default router
