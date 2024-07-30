import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarEvent } from 'angular-calendar';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private URL_API = config.URL_API_BASE + '/agenda';

  constructor(private http: HttpClient) { }

  getAgendas(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(this.URL_API);
  }
}
