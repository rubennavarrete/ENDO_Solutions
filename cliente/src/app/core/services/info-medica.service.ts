import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

import { DataMetadata } from '../models/metadata';
import { DataTypeInfoMedica,
  nuevoInfoMedica,
  InfoMedicaModel } from '../models/info-medica';

  import GetFiltersQuery from 'src/app/utils/filters/GetFiltersQuery';

const initInfoMedica: DataTypeInfoMedica = {
  id_inf_info_medica: 0,
  id_inf_paciente: 0,
  str_inf_alergias: '',
  str_inf_enfermedades: '',
  str_inf_medicamentos: '',
  str_inf_operaciones: '',
  str_inf_tipo_sangre: '',
  str_inf_limitaciones: '',
  str_inf_habitos_negativos: '',
  str_inf_antecedentes_familiares: '',
  str_inf_antecedentes_odontologicos: '',
  str_inf_antecedentes_personales: '',
  str_inf_estado: '',
};

@Injectable({
  providedIn: 'root'
})
export class InfoMedicaService {
  private destroy$ = new Subject<any>();

  private URL_API = config.URL_API_BASE + '/info_medica';

  infoMedica!: DataTypeInfoMedica[];
  metadata!: DataMetadata;

  private dataInfoMedica = new BehaviorSubject<DataTypeInfoMedica[]>([]);
  private dataMetadata$ = new Subject<DataMetadata>();

  private updateInfoMedica = new BehaviorSubject<DataTypeInfoMedica>(initInfoMedica);

  setInfoMedica(data: DataTypeInfoMedica[]) {
    this.dataInfoMedica.next(data);
  }

  get selectedInfoMedica$(): Observable<DataTypeInfoMedica[]> {
    return this.dataInfoMedica.asObservable();
  }

  setMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectedMetadata$(): Observable<DataMetadata> {
    return this.dataMetadata$.asObservable();
  }

  setUpdateInfoMedica(data: DataTypeInfoMedica) {
    this.updateInfoMedica.next(data);
  }

  get selectedUpdateInfoMedica$(): Observable<DataTypeInfoMedica> {
    return this.updateInfoMedica.asObservable();
  }

  constructor(private http: HttpClient) { }

  getInfoMedica(filter: any) {
    const query = GetFiltersQuery(filter);

    return this.http.get<InfoMedicaModel>(this.URL_API + query, {
      withCredentials: true,
    });
  }

  agregarInfoMedica(infoMedica: nuevoInfoMedica) {
    return this.http.post(this.URL_API, infoMedica, {
      withCredentials: true,
    });
  }

  actualizarInfoMedica(infoMedica: DataTypeInfoMedica) {
    return this.http.put(this.URL_API + '/' + infoMedica.id_inf_info_medica, infoMedica, {
      withCredentials: true,
    });
  }

  // getOneInfoMedica(filter: any) {
  //   this.getInfoMedica(filter)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (res: InfoMedicaModel) => {
  //         this.infoMedica = res.body;
  //         this.metadata = res.metadata;

  //         this.setInfoMedica(this.infoMedica);
  //         this.setMetadata(this.metadata);
  //       },
  //       error: (err) => {
  //         console.log('Error', err);
  //       },
        
  //     });
  // }

  //obtener información médica por id
  getOneInfoMedica(id: number) {
    return this.http.get<InfoMedicaModel>(this.URL_API + '/' + id, {
      withCredentials: true,
    });
  }
    
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
