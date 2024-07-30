import { Router } from "express";
import { getProcesos, getProcesosActivos,getProcesoById, createProceso, updateProceso, deleteProceso } from "../controllers/proceso.controller.js";

const router = Router();

router.get('/', getProcesos);
router.get('/activos', getProcesosActivos);
router.get('/:id', getProcesoById);
router.post('/', createProceso);
router.put('/:id', updateProceso);
router.delete('/:id', deleteProceso);

export default router;