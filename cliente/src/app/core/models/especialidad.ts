import { DataMetadata } from './metadata';

export interface DataTypeEspecialidad {
    id_esp_especialidad: number;
    str_esp_nombre: string;
    str_esp_descripcion: string;
    str_esp_estado: string;
}

export interface nuevaEspecialidad {
    str_esp_nombre: string;
    str_esp_descripcion: string;
    // str_esp_estado: string;
}

export interface EspecialidadModel {
    status: boolean;
    body: DataTypeEspecialidad[];
    message: string;
    metadata: DataMetadata;
}