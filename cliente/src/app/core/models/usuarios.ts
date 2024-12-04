import { DataMetadata } from './metadata';

export interface DataTypeUsuarios {
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
    int_per_rol: number
}

export interface nuevoUsuario {
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

export interface UsuarioModel {
    status: boolean;
    body: DataTypeUsuarios;
    message: string;
    metadata: DataMetadata;
}