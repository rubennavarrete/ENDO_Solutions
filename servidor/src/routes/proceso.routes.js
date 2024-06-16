import { Router } from "express";
import { getProcesos, getProcesoById, createProceso, updateProceso, deleteProceso } from "../controllers/proceso.controller.js";

const router = Router();

router.get('/', getProcesos);
router.get('/:id', getProcesoById);
router.post('/', createProceso);
router.put('/:id', updateProceso);
router.delete('/:id', deleteProceso);

export default router;