import { DataMetadata } from './metadata';

export interface DataTypeUbicacion {
    id_ubi_ubicacion: number;
    str_ubi_nombre: string;
    str_ubi_descripcion: string;
    str_ubi_estado: string;
}

export interface nuevaUbicacion {
    nombre: string;
    descripcion: string;
    estado: string;
}

export interface UbicacionModel {
    status: boolean;
    body: DataTypeUbicacion[];
    message: string;
    metadata: DataMetadata;
}
