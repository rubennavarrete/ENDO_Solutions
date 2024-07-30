import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DataMetadata } from '../models/metadata';
import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';
import { DataTypeEspecialidad, nuevaEspecialidad, EspecialidadModel } from '../models/especialidad';

const initEspecialidad: DataTypeEspecialidad = {
  id_esp_especialidad: 0,
  str_esp_nombre: '',
  str_esp_descripcion: '',
  str_esp_estado: '',
};

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private destroy$ = new Subject<any>();
  private URL_API = config.URL_API_BASE + '/especialidad';

  especialidad!: DataTypeEspecialidad[];
  metadata!: DataMetadata;

  private dataEspecialidad = new BehaviorSubject<DataTypeEspecialidad[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();
  private updateEspecialidad = new BehaviorSubject<DataTypeEspecialidad>(initEspecialidad);

  setEspecialidad(data: DataTypeEspecialidad[]) {
    this.dataEspecialidad.next(data);
  }

  get selectedEspecialidad$(): Observable<DataTypeEspecialidad[]> {
    return this.dataEspecialidad.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdateEspecialidad(data: DataTypeEspecialidad) {
    this.updateEspecialidad.next(data);
  }

  get selectedUpdateEspecialidad$(): Observable<DataTypeEspecialidad> {
    return this.updateEspecialidad.asObservable();
  }

  constructor(
    private http: HttpClient
  ) {
    this.getEspecialidades({});
  }

  getEspecialidades(filter: any) {
    const query = GetFiltersQuery(filter);
    return this.http.get<EspecialidadModel>(this.URL_API + query, {
      withCredentials: true
    })
  }

  putEspecialidad(id: number, data: nuevaEspecialidad) {
    return this.http.put<EspecialidadModel>(this.URL_API + '/' + id, data, {
      withCredentials: true
    });
  }

  deleteEspecialidad(id: number) {
    return this.http.delete<EspecialidadModel>(this.URL_API + '/' + id, {
      withCredentials: true
    });
  }

  agregarEspecialidad(data: nuevaEspecialidad) {
    return this.http.post<EspecialidadModel>(this.URL_API, data, {
      withCredentials: true
    });
  }

  obtenerEspecialidad(filters: any) {
    this.getEspecialidades(filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: EspecialidadModel) => {
          this.especialidad = data.body;
          this.metadata = data.metadata;
          this.setEspecialidad(this.especialidad);
          this.setMetadata(this.metadata);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
