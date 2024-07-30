import { Router } from "express";
import { getPacientes, getPacientesActivos, getPacienteById, createPaciente, updatePaciente, deletePaciente } from "../controllers/paciente.controller.js";

const router = Router();

router.get('/', getPacientes);
router.get('/activos', getPacientesActivos);
router.get('/:id', getPacienteById);
router.post('/', createPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);

export default router;