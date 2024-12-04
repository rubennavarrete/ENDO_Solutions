import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { DataMetadata } from '../models/metadata';

import {
  DataTypeOdontograma,
  nuevoOdontograma,
  OdontogramaModel,
} from '../models/odontograma';
import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';

const initOdontograma: DataTypeOdontograma = {
  id_odo_odontograma: 0,
    id_odo_paciente: 0,
    int_odo_diente:0,
    dt_odo_fecha_registro: '',
    str_odo_cara: '',
    str_odo_diagnostico: '',
};

@Injectable({
  providedIn: 'root'
})
export class OdontogramaService {

  private destroy$ = new Subject<any>();
  private URL_API = config.URL_API_BASE + '/odontograma';

  Odontograma!: DataTypeOdontograma[];
  metadata!: DataMetadata;

  private dataOdontograma = new BehaviorSubject<DataTypeOdontograma[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();

  private updateOdontograma = new BehaviorSubject<DataTypeOdontograma>(initOdontograma);

  setOdontograma(data: DataTypeOdontograma[]) {
    this.dataOdontograma.next(data);
  }

  get selectedOdontograma$(): Observable<DataTypeOdontograma[]> {
    return this.dataOdontograma.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdateOdontograma(data: DataTypeOdontograma) {
    this.updateOdontograma.next(data);
  }

  get selectedUpdateOdontograma$(): Observable<DataTypeOdontograma> {
    return this.updateOdontograma.asObservable();
  }

  constructor(private http: HttpClient) {
    this.getOdontograma({});
  }

  getOdontograma(filter: any) {
    const query = GetFiltersQuery(filter);
    console.log('Query en servicio', query);
    return this.http.get<OdontogramaModel>(this.URL_API + query, {
      withCredentials: true,
    });
  }

  createOdontograma(data: nuevoOdontograma) {
    return this.http.post<OdontogramaModel>(this.URL_API, data, {
      withCredentials: true,
    });
  }

  putOdontograma(id: number, data: DataTypeOdontograma) {
    return this.http.put<OdontogramaModel>(this.URL_API + '/' + id, data, {
      withCredentials: true,
    });
  }

  getByIdOdontograma(id: number) {
    return this.http.get<OdontogramaModel>(this.URL_API + '/' + id, {
      withCredentials: true,
    });
  }

  deleteOdontograma(id: number) {
    return this.http.delete<OdontogramaModel>(this.URL_API + '/' + id, {
      withCredentials: true,
    });
  }

  getlistOdontograma(filter: any) {
    console.log('Filter en getlistOdontograma', filter);
    this.getOdontograma(filter)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data) => {
        console.log('Data en servicio', data);
        this.Odontograma = data.body;
        this.metadata = data.metadata;
        this.setOdontograma(this.Odontograma);
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
