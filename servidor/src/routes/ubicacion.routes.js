import { Router } from "express";
import { getUbicaciones,getUbicacionesActivas, getUbicacionById, createUbicacion, updateUbicacion, deleteUbicacion } from "../controllers/ubicacion.controller.js";

const router = Router();

router.get('/', getUbicaciones);
router.get('/activos', getUbicacionesActivas);
router.get('/:id', getUbicacionById);
router.post('/', createUbicacion);
router.put('/:id', updateUbicacion);
router.delete('/:id', deleteUbicacion);

export default router;