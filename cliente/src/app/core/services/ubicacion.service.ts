import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DataMetadata } from '../models/metadata';
import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';
import { DataTypeUbicacion, nuevaUbicacion, UbicacionModel } from '../models/ubicacion';

const initUbicacion: DataTypeUbicacion = {
  id_ubi_ubicacion: 0,
  str_ubi_nombre: '',
  str_ubi_descripcion: '',
  str_ubi_estado: '',
};

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private destroy$ = new Subject<any>();
  private URL_API = config.URL_API_BASE + '/ubicacion';

  ubicacion!: DataTypeUbicacion[];
  metadata!: DataMetadata;

  private dataUbicacion = new BehaviorSubject<DataTypeUbicacion[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();
  private updateUbicacion = new BehaviorSubject<DataTypeUbicacion>(initUbicacion);

  setUbicacion(data: DataTypeUbicacion[]) {
    this.dataUbicacion.next(data);
  }

  get selectedUbicacion$(): Observable<DataTypeUbicacion[]> {
    return this.dataUbicacion.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdateUbicacion(data: DataTypeUbicacion) {
    this.updateUbicacion.next(data);
  }

  get selectedUpdateUbicacion$(): Observable<DataTypeUbicacion> {
    return this.updateUbicacion.asObservable();
  }

  constructor(private http: HttpClient) {
    this.getUbicaciones({});
  }

  getUbicaciones(filter: any) {
    const query = GetFiltersQuery(filter);
    return this.http.get<UbicacionModel>(this.URL_API + query, {
      withCredentials: true
    })
  }

  putUbicacion(id: number, data: nuevaUbicacion) {
    return this.http.put<UbicacionModel>(this.URL_API + `/${id}`, data, {
      withCredentials: true
    })
  }

  agregarUbicacion(data: nuevaUbicacion) {
    return this.http.post<UbicacionModel>(this.URL_API, data, {
      withCredentials: true
    })
  }

  deleteUbicacion(id: number) {
    return this.http.delete<UbicacionModel>(this.URL_API + `/${id}`, {
      withCredentials: true
    })
  }

  obternerUbicaciones(filters: any) {
    this.getUbicaciones(filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: UbicacionModel) => {
          this.ubicacion = res.body;
          this.metadata = res.metadata;
          this.setUbicacion(this.ubicacion);
          this.setMetadata(this.metadata);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
