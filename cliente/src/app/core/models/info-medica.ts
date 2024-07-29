import { DataMetadata } from './metadata';

export interface DataTypeInfoMedica {
    id_inf_info_medica: number;
    id_inf_paciente: number;
    str_inf_alergias: string;
    str_inf_enfermedades: string;
    str_inf_medicamentos: string;
    str_inf_operaciones: string;
    str_inf_tipo_sangre: string;
    str_inf_limitaciones: string;
    str_inf_habitos_negativos: string;
    str_inf_antecedentes_familiares: string;
    str_inf_antecedentes_odontologicos: string;
    str_inf_antecedentes_personales: string;
    str_inf_estado: string;
}

export interface nuevoInfoMedica {
    id_inf_paciente: number;
    str_inf_alergias: string;
    str_inf_enfermedades: string;
    str_inf_medicamentos: string;
    str_inf_operaciones: string;
    str_inf_tipo_sangre: string;
    str_inf_limitaciones: string;
    str_inf_habitos_negativos: string;
    str_inf_antecedentes_familiares: string;
    str_inf_antecedentes_odontologicos: string;
    str_inf_antecedentes_personales: string;
    // str_inf_estado: string;
}

export interface InfoMedicaModel {
    status: boolean;
    body: DataTypeInfoMedica[];
    message: string;
    metadata: DataMetadata;
}