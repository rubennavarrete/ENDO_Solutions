import { DataMetadata } from './metadata';

export interface DataTypeHistorialConsulta {
    id_con_consulta: number;
    id_con_medico: number;
    id_con_paciente: number;
    str_con_motivo: string;
    str_con_exam_general: string;
    str_con_exam_especifico: string;
    str_con_diagnostico: string;
    str_con_tratamiento: string;
    str_con_recomendaciones: string;
    str_con_observaciones: string;
    dt_con_fecha: string;
    tm_con_hora_inicio: string;
    tm_con_hora_fin: string;
    str_con_estado: string;
}

export interface nuevoHistorialConsulta {
    id_con_medico: number;
    id_con_paciente: number;
    str_con_motivo: string;
    str_con_exam_general: string;
    str_con_exam_especifico: string;
    str_con_diagnostico: string;
    str_con_tratamiento: string;
    str_con_recomendaciones: string;
    str_con_observaciones: string;
    dt_con_fecha: string;
    tm_con_hora_inicio: string;
    tm_con_hora_fin: string;
    // str_con_estado: string;
    
}

export interface HistorialConsultaModel {
    status: boolean;
    body: DataTypeHistorialConsulta[];
    message: string;
    metadata: DataMetadata;
}