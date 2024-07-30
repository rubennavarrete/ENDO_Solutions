import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { InfoMedicaService } from 'src/app/core/services/info-medica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info-medica',
  templateUrl: './info-medica.component.html',
  styleUrls: ['./info-medica.component.css']
})
export class InfoMedicaComponent implements OnInit, OnDestroy {
  loading = false;
  request = false;
  myForm!: FormGroup;
  id: number = -1;

  private destroy$ = new Subject<any>();


  constructor(
    public srvModal: ModalService,
    public svrInfoMedica: InfoMedicaService,
    public fb: FormBuilder
  ) { 
    console.log('Entro a info medica');
    srvModal.selectId$.pipe().subscribe((id) => {
      this.id = id;
      console.log('ID', this.id);
    }
    );
    this.myForm = this.fb.group({
      // id_inf_info_medica
      id_inf_paciente: [this.id, Validators.required],
      str_inf_alergias: [ 'Ninguno',Validators.required],
      str_inf_enfermedades: ['Ninguno',Validators.required],
      str_inf_medicamentos: ['Ninguno',Validators.required],
      str_inf_operaciones: [ 'Ninguno',Validators.required],
      str_inf_tipo_sangre: ['Ninguno',Validators.required],
      str_inf_limitaciones: ['Ninguno',Validators.required],
      str_inf_habitos_negativos: ['Ninguno',Validators.required],
      str_inf_antecedentes_familiares: ['Ninguno',Validators.required],
      str_inf_antecedentes_odontologicos: ['Ninguno', Validators.required],
      str_inf_antecedentes_personales: ['Ninguno',Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.svrInfoMedica.getOneInfoMedica(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((resp: any) => {
              console.log('RESPUESTA', resp);
              if(resp.status)
                this.myForm.patchValue(resp.body);

    });
  }

  agregarIM() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de agregar una nueva información médica',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Creando Información Médica...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.svrInfoMedica.agregarInfoMedica(this.myForm.value).subscribe({
          next: (resp: any) => {
            if (resp.status) {
              Swal.close();
              Swal.fire({
                icon: 'success',
                title: resp.message,
                showDenyButton: false,
                confirmButtonText: 'Aceptar',
              });
            } else {
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: resp.message,
                text: 'Algo salió mal',
              });
              this.request = false;
            }

            this.svrInfoMedica.getOneInfoMedica(this.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((resp: any) => {
              this.myForm.patchValue(resp.data);
              console.log('RESPUESTA', resp);
            });

            // this.myForm.reset();
            // this.srvModal.closeModal();

          },
          error: (err) => {
            console.log('ERROR AL CREAR LA INFORMACIÓN MÉDICA', err);
            this.request = false;
            Swal.fire({
              title: 'ERROR: al crear la información médica',
              text: 'Por favor comuníquese con el servicio técnico',
              icon: 'error',
              footer:
                err.error.message +
                '\n' +
                (err.error.errores ? JSON.stringify(err.error.errores) : ''),
              showDenyButton: false,
              confirmButtonText: 'Aceptar',
            });
          },
          complete: () => {
            // this.srvModal.setId(-1);
            this.request = false;

          },
        });
      } else if (result.isDenied) {
        Swal.fire('Los cambios no se guardaron', '', 'info');

      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
