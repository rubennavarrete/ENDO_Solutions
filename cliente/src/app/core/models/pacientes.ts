import { DataMetadata } from './metadata';

export interface DataTypePacientes {
  id_pac_paciente: number;
  str_pac_nombre: string;
  str_pac_apellido: string;
  str_pac_cedula: string;
  str_pac_correo: string;
  str_pac_sexo: string;
  str_pac_estado: string;
  str_pac_telefono: string;
  str_pac_nombre_familia: string;
  str_pac_telefono_familia: string;
  tr_pac_relacion_familia: string;
  dt_pac_fecha_nacimiento: string;
  str_pac_direccion: string;
}

export interface nuevoPaciente {
  str_pac_nombre: string;
  str_pac_apellido: string;
  str_pac_cedula: string;
  str_pac_correo: string;
  str_pac_sexo: string;
  str_pac_telefono: string;
  str_pac_nombre_familia: string;
  str_pac_telefono_familia: string;
  tr_pac_relacion_familia: string;
  dt_pac_fecha_nacimiento: string;
  str_pac_direccion: string;
}

export interface PacienteModel {
  status: boolean;
  body: DataTypePacientes[];
  message: string;
  metadata: DataMetadata;
}
