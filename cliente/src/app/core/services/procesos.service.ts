import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DataMetadata } from '../models/metadata';
import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';
import { DataTypeProcesos, nuevoProceso, ProcesosModel } from '../models/procesos';

const initProceso: DataTypeProcesos = {
  id_proc_proceso: 0,
  str_proc_nombre: '',
  str_proc_descripcion: '',
  str_proc_estado: '',
  num_proc_costo: '',
};

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  private destroy$ = new Subject<any>();
  private URL_API = config.URL_API_BASE + '/proceso';

  proceso!: DataTypeProcesos[];
  metadata!: DataMetadata;

  private dataProceso = new BehaviorSubject<DataTypeProcesos[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();
  private updateProceso = new BehaviorSubject<DataTypeProcesos>(initProceso);

  setProceso(data: DataTypeProcesos[]) {
    this.dataProceso.next(data);
  }

  get selectedProceso$(): Observable<DataTypeProcesos[]> {
    return this.dataProceso.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdateProceso(data: DataTypeProcesos) {
    this.updateProceso.next(data);
  }

  get selectedUpdateProceso$(): Observable<DataTypeProcesos> {
    return this.updateProceso.asObservable();
  }

  constructor( private http: HttpClient) {
    this.getProcesos({});
   }

   getProcesos(filter: any) {
    const query = GetFiltersQuery(filter);
    return this.http.get<ProcesosModel>(this.URL_API + query, {
      withCredentials: true
    })
  }

  putProceso(id: number, data: nuevoProceso) {
    return this.http.put<ProcesosModel>(this.URL_API + '/' + id, data, {
      withCredentials: true
    })
  }

  deleteProceso(id: number) {
    return this.http.delete<ProcesosModel>(this.URL_API + '/' + id, {
      withCredentials: true
    })
  }

  agregarProceso(data: nuevoProceso) {
    return this.http.post<ProcesosModel>(this.URL_API, data, {
      withCredentials: true
    })
  }

  obtenerProceso(filters: any) {
    this.getProcesos(filters)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (data: ProcesosModel) => {
        this.proceso = data.body;
        this.metadata = data.metadata;
        this.setProceso(this.proceso);
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
