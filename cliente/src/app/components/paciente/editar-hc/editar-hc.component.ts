import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { HistorialConsultaService } from 'src/app/core/services/historial-consulta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-hc',
  templateUrl: './editar-hc.component.html',
  styleUrls: ['./editar-hc.component.css']
})
export class EditarHCComponent {

}
