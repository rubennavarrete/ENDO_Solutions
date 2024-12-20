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
    id_esp_especialidad: number;
    str_esp_nombre: string;
    int_per_rol: number
}

export interface nuevoDoctor {
    nombre: string;
    apellido: string;
    cedula: string;
    correo: string;
    contrasenia: string;
    telefono: string;
    direccion: string;
    tipo: string;
    especialidadId: number;
    rol: number;
}

export interface DoctorModel {
    status: boolean;
    body: DataTypeDoctores[];
    message: string;
    metadata: DataMetadata;
}