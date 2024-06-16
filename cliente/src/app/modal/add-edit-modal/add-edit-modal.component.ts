import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css'],
})
export class AddEditModalComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();

  constructor(private srvModal: ModalService) {}

  public tipoFormulario: string = '';
  public titleModal: string = '';

  ngOnInit(): void {
    this.srvModal.selectFormModal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        // console.log('en el ts del modal', data);
        this.tipoFormulario = data.formulario;
        this.titleModal = data.title;
      });
  }

  cerrarModal() {
    localStorage.clear();
    this.srvModal.closeModal();
    this.tipoFormulario = 'clear';
    this.titleModal = '';
    this.srvModal.openModal();
    this.srvModal.closeModal();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
