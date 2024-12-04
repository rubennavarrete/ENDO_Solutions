import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { DataMetadata } from '../models/metadata';
import { DataTypeUsuarios, nuevoUsuario, UsuarioModel } from '../models/usuarios';
import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';

const initUser: DataTypeUsuarios = {
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
  // id_esp_especialidad: 0,
  // str_esp_nombre: '',
  int_per_rol: 0
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private destroy$ = new Subject<any>();
  private URL_API = config.URL_API_BASE + '/persona';

  user!: DataTypeUsuarios[];
  metadata!: DataMetadata;

  private dataUsuario = new BehaviorSubject<DataTypeUsuarios[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();
  private updateUsuario = new BehaviorSubject<DataTypeUsuarios>(initUser);

  setUsuario(data: DataTypeUsuarios[]) {
    this.dataUsuario.next(data);
  }

  get selectedDoctor$(): Observable<DataTypeUsuarios[]> {
    return this.dataUsuario.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdateUsuario(data: DataTypeUsuarios) {
    this.updateUsuario.next(data);
  }

  get selectedUpdateUsuario$(): Observable<DataTypeUsuarios> {
    return this.updateUsuario.asObservable();
  }

  constructor(private http: HttpClient) { this.getUsuarios({});}

  getUsuarios(filters: any) {
    const query = GetFiltersQuery(filters);
    return this.http.get<UsuarioModel>(this.URL_API + query,{
      withCredentials: true,
    })
   }

   agregarUsuario(data: nuevoUsuario) {
    return this.http.post<UsuarioModel>(this.URL_API, data, {
      withCredentials: true,
    });
  }

  getUsuario(id: number){
    return this.http.get<UsuarioModel>(`${this.URL_API}/${id}`, {
      withCredentials: true,
    });
  }


  putUsuario(id: number, data: nuevoUsuario) {
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

  // obtenerDoctor(filters: any) {
  //   this.getUsuarios(filters)
  //   .pipe(takeUntil(this.destroy$))
  //   .subscribe({
  //     next: (resp: UsuarioModel) => {
  //       this.user = resp.body;
  //       this.metadata = resp.metadata;
  //       this.setUsuario(resp.body);
  //       this.setMetadata(resp.metadata);
  //       console.log('useer', this.user);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     }
  //   });
  // }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
