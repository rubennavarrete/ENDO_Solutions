import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const initModal: any = {
  formulario: '',
  title: '',
  data: {},
};
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  //Behaviors Subjects

  private FormModal$ = new BehaviorSubject<any>(initModal);
  private id$ = new BehaviorSubject<number>(0);
  private nombrePaciente$ = new BehaviorSubject<string>('');

  // Funciones para emitir los cambios Contratacion
  setFormModal(data: any) {
    console.log('data en serviced => ', data);
    this.FormModal$.next(data);
  }

  // Funciones para recibir los cambios Contratacion
  get selectFormModal$(): Observable<any> {
    return this.FormModal$.asObservable();
  }

  setId( id: number) {
    console.log('id en serviced => ', id);
    this.id$.next(id);
  }

  get selectId$(): Observable<number> {
    return this.id$.asObservable();
  }

  setNombrePaciente( nombre: string) {
    console.log('nombre en serviced => ', nombre);
    this.nombrePaciente$.next(nombre);
  }

  get selectNombrePaciente$(): Observable<string> {
    return this.nombrePaciente$.asObservable();
  }

  //Funciones Modal

  // private _dataModal$ = new BehaviorSubject<DataTipoContratacion>(dataModal);

  // get selectForm (): Observable<DataTipoContratacion>{
  //   return this._dataModal$.asObservable();
  // }

  // setForm (){

  // }

  openModal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;
    if (modalGeneral) {
      modalGeneral.style.display = 'block';
      modalGeneral.classList.add('show');
      modalGeneral.style.backgroundColor = 'rgba(0,0,0,0.5)';
      setTimeout(() => {
        if (modalGeneral) {
          modalGeneral.style.opacity = 1;
        }
      }); //FOR TRANSITION
    }
  }

  closeModal() {
    let modalGeneral = document.getElementById('modalGeneral') as any;

    if (modalGeneral) {
      modalGeneral.style.display = 'none';
      modalGeneral.classList.remove('show');
      modalGeneral.style.opacity = 1;
    }
  }
}
