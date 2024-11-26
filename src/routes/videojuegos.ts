import { Router } from 'express';
import { getAllVideojuegos, getFilteredVideojuegos, createVideojuego } from '../controllers/videojuegosController';

const router = Router();

router.get('/videojuegos', getAllVideojuegos);
router.get('/videojuegos/filtrar', getFilteredVideojuegos);
router.post('/videojuegos', createVideojuego);

export default router;
