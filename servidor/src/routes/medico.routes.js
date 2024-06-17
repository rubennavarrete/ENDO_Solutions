import {Router} from 'express';
import {getMedicos, getMedicoById, createMedico, updateMedico, deleteMedico} from '../controllers/medico.controller.js';
import { getPersonas, createPersona, updatePersona, deletePersona } from '../controllers/persona.controller.js';
const router = Router();

router.get('/',getPersonas);
router.get('/:id',getMedicoById);
router.post('/',createPersona);
router.put('/:id',updatePersona);
router.delete('/:id',deletePersona);

export default router;