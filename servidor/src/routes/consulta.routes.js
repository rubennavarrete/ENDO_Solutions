import { Router } from "express";
import { getConsultas, getConsultaById, createConsulta, updateConsulta, deleteConsulta } from "../controllers/consulta.controller.js";

const router = Router();

router.get('/', getConsultas);
router.get('/:id', getConsultaById);
router.post('/', createConsulta);
router.put('/:id', updateConsulta);
router.delete('/:id', deleteConsulta);

export default router;