import { Router } from "express";
import {createOdontograma, updateOdontograma, deleteOdontograma, getOdontogramaById, getOdontogramaByPaciente, } from "../controllers/odontograma.controller.js"

const router = Router();

router.get('/', getOdontogramaByPaciente);
router.get('/:id', getOdontogramaById);
router.post('/', createOdontograma);
router.put('/:id', updateOdontograma);
router.delete('/:id', deleteOdontograma);

export default router;