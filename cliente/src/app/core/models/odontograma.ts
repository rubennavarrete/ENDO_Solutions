import { DataMetadata } from './metadata';

export interface DataTypeOdontograma{
    id_odo_odontograma: number;
    id_odo_paciente: number;
    int_odo_diente:number;
    dt_odo_fecha_registro: string;
    str_odo_cara: string;
    str_odo_diagnostico: string;
}

export interface nuevoOdontograma{
    id_odo_paciente: number;
    int_odo_diente:number;
    dt_odo_fecha_registro: string;
    str_odo_cara: string;
    str_odo_diagnostico: string;
}

export interface OdontogramaModel {
    status: boolean;
    body: DataTypeOdontograma[];
    message: string;
    metadata: DataMetadata;
}