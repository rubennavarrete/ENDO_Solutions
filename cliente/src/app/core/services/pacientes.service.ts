import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { DataMetadata } from '../models/metadata';

import {
  DataTypePacientes,
  nuevoPaciente,
  PacienteModel,
} from '../models/pacientes';
import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';

const initPaciente: DataTypePacientes = {
  id_pac_paciente: 0,
  str_pac_nombre: '',
  str_pac_apellido: '',
  str_pac_cedula: '',
  str_pac_correo: '',
  str_pac_sexo: '',
  str_pac_estado: '',
  str_pac_telefono: '',
  str_pac_nombre_familia: '',
  str_pac_telefono_familia: '',
  tr_pac_relacion_familia: '',
  dt_pac_fecha_nacimiento: '',
  str_pac_direccion: '',
};

@Injectable({
  providedIn: 'root',
})
export class PacientesService {
  private destroy$ = new Subject<any>();

  private URL_API = config.URL_API_BASE + '/paciente';

  paciente!: DataTypePacientes[];
  metadata!: DataMetadata;

  private dataPaciente = new BehaviorSubject<DataTypePacientes[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();

  private updatePaciente = new BehaviorSubject<DataTypePacientes>(initPaciente);

  setPaciente(data: DataTypePacientes[]) {
    this.dataPaciente.next(data);
  }

  get selectedPaciente$(): Observable<DataTypePacientes[]> {
    return this.dataPaciente.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdatePaciente(data: DataTypePacientes) {
    // console.log('Data en servicio', data);
    this.updatePaciente.next(data);
  }

  get selectedUpdatePaciente$(): Observable<DataTypePacientes> {
    return this.updatePaciente.asObservable();
  }

  constructor(private http: HttpClient) {
    this.getPacientes({});
  }

  getPacientes(filter: any) {
    const query = GetFiltersQuery(filter);
    return this.http.get<PacienteModel>(this.URL_API + query, {
      withCredentials: true,
    });
  }

  agregarPaciente(paciente: nuevoPaciente) {
    return this.http.post(this.URL_API, paciente, {
      withCredentials: true,
    });
  }

  putPaciente(id: number, paciente: nuevoPaciente) {
    return this.http.put(`${this.URL_API}/${id}`, paciente, {
      withCredentials: true,
    });
  }

  deletePaciente(id: number) {
    return this.http.delete(this.URL_API + '/' + id, {
      withCredentials: true,
    });
  }

  obtenerPaciente(filter: any) {
    // console.log('Filter en serviico', filter);
    this.getPacientes(filter)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: PacienteModel) => {
          this.paciente = res.body;
          this.metadata = res.metadata;
          this.setPaciente(this.paciente);
          this.setMetadata(this.metadata);
        },
        error: (err) => {
          console.log('Error', err);
        },
      });
  }
}
