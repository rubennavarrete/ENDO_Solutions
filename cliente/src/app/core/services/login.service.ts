import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'config/config';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { LoginModel, DataTypeUser, dataLoginUser} from 'src/app/core/models/login'
 
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private destroy$ = new Subject<any>();
  private URL_API = config.URL_API_BASE + '/login';

  private currentUserSubject = new BehaviorSubject<DataTypeUser | null>(null);
  public currentUser$: Observable<DataTypeUser | null> = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  /**
   * Realiza el inicio de sesión
   * @param credentials Credenciales de inicio de sesión
   * @returns Observable con la respuesta del servidor
   */
  login(credentials: dataLoginUser): Observable<any> {
    return new Observable((observer) => {
      this.http.post<{ message: string; token: string; user: DataTypeUser }>(this.URL_API, credentials).subscribe({
        next: (response) => {
          // console.log('login services -> ',response)
          // Guardar token en localStorage
          localStorage.setItem(this.tokenKey, response.token);
          // Actualizar el usuario actual
          this.currentUserSubject.next(response.user);
          observer.next(response);
        },
        error: (err) => {
          observer.error(err);
        },
      });
    });
  }

  /**
   * Obtiene el usuario actual almacenado
   * @returns Usuario actual
   */
  getCurrentUser(): DataTypeUser | null {
    return this.currentUserSubject.value;
  }

  /**
   * Cierra sesión eliminando los datos del token y usuario actual
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Obtiene el token almacenado
   * @returns Token de autenticación
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }}
