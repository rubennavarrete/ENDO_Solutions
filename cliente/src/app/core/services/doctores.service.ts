import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DataMetadata } from '../models/metadata';
import { DataTypeDoctores, nuevoDoctor, DoctorModel } from '../models/doctores';
import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';

const initDoctor: DataTypeDoctores = {
  id_per_persona: 0,
  str_per_nombre: '',
  str_per_apellido: '',
  str_per_cedula: '',
  str_per_correo: '',
  str_per_contrasenia: '',
  str_per_telefono: '',
  str_per_direccion: '',
  str_per_estado: '',
  str_per_tipo: '',
  id_esp_especialidad: 0,
  str_esp_nombre: '',
  int_per_rol: 0
};

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  private destroy$ = new Subject<any>();
  private URL_API = config.URL_API_BASE + '/medico';
  private URL_API_ESPECIALIDAD = config.URL_API_BASE + '/especialidad/activos';

  doctor!: DataTypeDoctores[];
  metadata!: DataMetadata;

  private dataDoctor = new BehaviorSubject<DataTypeDoctores[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();

  private updateDoctor = new BehaviorSubject<DataTypeDoctores>(initDoctor);

  setDoctor(data: DataTypeDoctores[]) {
    this.dataDoctor.next(data);
  }

  get selectedDoctor$(): Observable<DataTypeDoctores[]> {
    return this.dataDoctor.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdateDoctor(data: DataTypeDoctores) {
    this.updateDoctor.next(data);
  }

  get selectedUpdateDoctor$(): Observable<DataTypeDoctores> {
    return this.updateDoctor.asObservable();
  }

  constructor( private http: HttpClient) {
    this.getDoctores({});
   }

   getDoctores(filters: any) {
    const query = GetFiltersQuery(filters);
    return this.http.get<DoctorModel>(this.URL_API + query,{
      withCredentials: true,
    })
   }

   agregarDoctor(data: nuevoDoctor) {
    return this.http.post<DoctorModel>(this.URL_API, data, {
      withCredentials: true,
    });
  }

  putDoctor(id: number, data: nuevoDoctor) {
    // return this.http.put<DoctorModel>(`${this.URL_API}/${id}`, data, {
    //   withCredentials: true,
    // });
    return this.http.put(`${this.URL_API}/${id}`, data, {
      withCredentials: true,
    });
  }

  deleteDoctor(id: number) {
    // return this.http.delete<DoctorModel>(`${this.URL_API}/${id}`, {
    //   withCredentials: true,
    // });
    return this.http.delete(this.URL_API + '/' + id, {
      withCredentials: true,
    });
  }

  obtenerDoctor(filters: any) {
    this.getDoctores(filters)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resp: DoctorModel) => {
        this.doctor = resp.body;
        this.metadata = resp.metadata;
        this.setDoctor(resp.body);
        this.setMetadata(resp.metadata);
        console.log('Doctor', this.doctor);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getEspecialidades(){
    return this.http.get(this.URL_API_ESPECIALIDAD, {
      withCredentials: true,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


}
