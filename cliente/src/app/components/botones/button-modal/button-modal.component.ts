import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-button-modal',
  templateUrl: './button-modal.component.html',
  styleUrls: ['./button-modal.component.css'],
})
export class ButtonModalComponent implements AfterViewInit {
  //obteniendo contenido y confirmaciond eicono del boton
  @Input() contenido: string = 'none';
  @Input() conIcono: boolean = true;
  @Input() icono: string = 'none';
  @Input() color: string = 'var(--color-black)';
  @Input() titleModal: string = '...';
  @Input() tipoModal: string = '';
  @Input() cuadrado: boolean = false;
  @Input() darkMode: boolean = false;
  @Input() data: any = null;

  // capturando elementos  del padre
  @ViewChild('btnc') btnc!: ElementRef;
  @ViewChild('icono') icon!: ElementRef;

  // elementos del element form
  elementForm: {
    formulario: string;
    title: string;
  } = { formulario: '', title: '' };

  constructor(private srvModal: ModalService) {}

  seleccionarInput(_tipoForm: string) {
    this.elementForm.formulario = _tipoForm;
    this.elementForm.title = this.titleModal;
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.openModal();
  }

  ngAfterViewInit(): void {
    this.btnc.nativeElement.style.backgroundColor = this.color;

    if (!this.conIcono) {
      this.icon.nativeElement.style.display = 'none';
    } else {
      this.icon.nativeElement.style.display = 'block';
      this.icon.nativeElement.innerHTML = this.icono;
    }

    if (this.icono === 'edit' || this.icono === 'delete') {
      this.icon.nativeElement.style.fontSize = '15px';
    }

    if (this.cuadrado === true) {
      this.btnc.nativeElement.classList.add('cuadrado');
    }

    if (this.darkMode) {
      this.btnc.nativeElement.classList.add('dark-mode');
    }
  }
}
