export interface DataTypeAgenda {
    id_age_agenda: number;
    id_age_medico: number;
    id_age_proceso: number;
    id_age_ubicacion: number;
    id_age_paciente: number;
    str_age_fecha: string;
    tm_age_hora_inicio: string;
    tm_age_hora_fin: string;
    tm_age_color: string;
    str_age_estado: string;
}

export interface nuevaAgenda{
    id_age_medico: number,
    id_age_proceso: number,
    id_age_ubicacion: number,
    id_age_paciente: number,
    str_age_fecha: string;
    tm_age_hora_inicio: string;
    tm_age_hora_fin: string;
    tm_age_color: string;
    str_age_estado: string;
}

export interface AgendaModel {
    status: boolean;
    message: string;
    body: DataTypeAgenda[];
}
