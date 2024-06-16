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

  // Funciones para emitir los cambios Contratacion
  setFormModal(data: any) {
    this.FormModal$.next(data);
  }

  // Funciones para recibir los cambios Contratacion
  get selectFormModal$(): Observable<any> {
    return this.FormModal$.asObservable();
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
