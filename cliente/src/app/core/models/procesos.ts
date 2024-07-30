import { DataMetadata } from './metadata';

export interface DataTypeProcesos {
    id_proc_proceso: number;
    str_proc_nombre: string;
    str_proc_descripcion: string;
    str_proc_estado: string;
    num_proc_costo: string;
}

export interface nuevoProceso {
    str_proc_nombre: string;
    str_proc_descripcion: string;
    str_proc_estado: string;
    num_proc_costo: string;
}

export interface ProcesosModel {
    status: boolean;
    body: DataTypeProcesos[];
    message: string;
    metadata: DataMetadata;
}