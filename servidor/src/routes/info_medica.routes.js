import { Router } from "express";
import { getInfoMedicas, getInfoMedicaById, createInfoMedica, updateInfoMedica, deleteInfoMedica } from "../controllers/info_medica.controller.js";

const router = Router();

router.get('/', getInfoMedicas);
router.get('/:id', getInfoMedicaById);
router.post('/', createInfoMedica);
router.put('/:id', updateInfoMedica);
router.delete('/:id', deleteInfoMedica);

export default router;