import { DataMetadata } from './metadata';

export interface DataTypeDoctores {
    id_per_persona: number;
    str_per_nombre: string;
    str_per_apellido: string;
    str_per_cedula: string;
    str_per_correo: string;
    str_per_contrasenia: string;
    str_per_telefono: string;
    str_per_direccion: string;
    str_per_estado: string;
    str_per_tipo: string;
}

export interface nuevoDoctor {
    str_per_nombre: string;
    str_per_apellido: string;
    str_per_cedula: string;
    str_per_correo: string;
    str_per_contrasenia: string;
    str_per_telefono: string;
    str_per_direccion: string;
    str_per_estado: string;
    str_per_tipo: string;
}

export interface DoctorModel {
    status: boolean;
    body: DataTypeDoctores[];
    message: string;
    metadata: DataMetadata;
}