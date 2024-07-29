import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { DataMetadata } from '../models/metadata';

import {
  DataTypeHistorialConsulta,
  nuevoHistorialConsulta,
  HistorialConsultaModel,
} from '../models/historial-consulta';
import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';

const initHistorialConsulta: DataTypeHistorialConsulta = {
  id_con_consulta: 0,
  id_con_medico: 0,
  id_con_paciente: 0,
  str_con_motivo: '',
  str_con_exam_general: '',
  str_con_exam_especifico: '',
  str_con_diagnostico: '',
  str_con_tratamiento: '',
  str_con_recomendaciones: '',
  str_con_observaciones: '',
  dt_con_fecha: '',
  tm_con_hora_inicio: '',
  tm_con_hora_fin: '',
  str_con_estado: '',
};

@Injectable({
  providedIn: 'root'
})
export class HistorialConsultaService {

  private destroy$ = new Subject<any>();
  private URL_API = config.URL_API_BASE + '/consulta';

  historialConsulta!: DataTypeHistorialConsulta[];
  metadata!: DataMetadata;

  private dataHistorialConsulta = new BehaviorSubject<DataTypeHistorialConsulta[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();

  private updateHistorialConsulta = new BehaviorSubject<DataTypeHistorialConsulta>(initHistorialConsulta);

  setHistorialConsulta(data: DataTypeHistorialConsulta[]) {
    this.dataHistorialConsulta.next(data);
  }

  get selectedHistorialConsulta$(): Observable<DataTypeHistorialConsulta[]> {
    return this.dataHistorialConsulta.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdateHC(data: DataTypeHistorialConsulta) {
    this.updateHistorialConsulta.next(data);
  }

  get selectedUpdateHistorialConsulta$(): Observable<DataTypeHistorialConsulta> {
    return this.updateHistorialConsulta.asObservable();
  }


  constructor(private http: HttpClient) {
    this.getHistorialConsulta({});
  }

  getHistorialConsulta(filter: any) {
    const query = GetFiltersQuery(filter);
    console.log('Query en servicio', query);
    return this.http.get<HistorialConsultaModel>(this.URL_API + query, {
      withCredentials: true,
    });
  }

  createHistorialConsulta(data: nuevoHistorialConsulta) {
    return this.http.post<HistorialConsultaModel>(this.URL_API, data, {
      withCredentials: true,
    });
  }

  putHistorialConsulta(id: number, data: DataTypeHistorialConsulta) {
    return this.http.put<HistorialConsultaModel>(this.URL_API + '/' + id, data, {
      withCredentials: true,
    });
  }

  deleteHistorialConsulta(id: number) {
    return this.http.delete<HistorialConsultaModel>(this.URL_API + '/' + id, {
      withCredentials: true,
    });
  }

  getHConsulta(filter: any) {
    console.log('Filter en srvicio', filter);
    this.getHistorialConsulta(filter)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        console.log('Data en servicio', data);
        this.historialConsulta = data.body;
        this.metadata = data.metadata;
        this.setHistorialConsulta(this.historialConsulta);
        this.setMetadata(this.metadata);
      },
      error: (err) => {
        console.log("Error -> ",err);
    }});
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }




}
