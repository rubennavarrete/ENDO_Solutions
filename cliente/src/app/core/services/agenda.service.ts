import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarEvent } from 'angular-calendar';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import {nuevaAgenda, AgendaModel, DataTypeAgenda} from '../models/agenda';
@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private URL_API = config.URL_API_BASE + '/agenda';
  private URL_API_O = config.URL_API_BASE ;



  constructor(private http: HttpClient) { }

  eventos!: CalendarEvent[];
  agenda!: DataTypeAgenda[];

  getAgendas(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.URL_API);
  }

  agregarAgenda(data: nuevaAgenda){
    return this.http.post<AgendaModel>(this.URL_API, data, {
      withCredentials: true,
    });
  }

  editarAgenda(data: AgendaModel, id: number){
    console.log('data en service => ', data, id);
    return this.http.put<AgendaModel>(`${this.URL_API}/${id}`, data, {
      withCredentials: true,
    });
  }

  getAgenda(id: number){
    return this.http.get<AgendaModel>(`${this.URL_API}/${id}`, {
      withCredentials: true,
    });
  }
  
  getProcesos(): Observable<{ id_proc_proceso: number; str_proc_nombre: string; }[]> {
    return this.http.get<{ id_proc_proceso: number; str_proc_nombre: string; }[]>(`${this.URL_API_O}/proceso/activos`);
  }

  getUbicaciones(): Observable<{ id_ubi_ubicacion: number; str_ubi_nombre: string; }[]> {
    return this.http.get<{ id_ubi_ubicacion: number; str_ubi_nombre: string; }[]>(`${this.URL_API_O}/ubicacion/activos`);
  }

  getPacientes(): Observable<{ id_pac_paciente: number; str_pac_nombre: string; str_pac_apellido: string; }[]> {
    return this.http.get<{ id_pac_paciente: number; str_pac_nombre: string; str_pac_apellido: string; }[]>(`${this.URL_API_O}/paciente/activos`);
  }

  getDoctores(): Observable<{ id_per_persona: number; str_per_nombre: string; str_per_apellido: string; }[]> {
    return this.http.get<{ id_per_persona: number; str_per_nombre: string; str_per_apellido: string; }[]>(`${this.URL_API_O}/medico`);
  }
}
