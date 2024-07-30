import {Router} from 'express';
import { getEspecialidades, getEspecialidadesActivas, getEspecialidadById, createEspecialidad, updateEspecialidad, deleteEspecialidad } from '../controllers/especialidad.controller.js';

const router = Router();

router.get('/',getEspecialidades);
router.get('/activos',getEspecialidadesActivas);
router.get('/:id',getEspecialidadById);
router.post('/',createEspecialidad);
router.put('/:id',updateEspecialidad);
router.delete('/:id',deleteEspecialidad);

export default router;