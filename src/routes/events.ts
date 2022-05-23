import express from 'express'
import { getEvents,toggleRedis} from '../controller/events'

const router = express.Router()


router.get('/', getEvents)
router.post('/', toggleRedis)


export default router