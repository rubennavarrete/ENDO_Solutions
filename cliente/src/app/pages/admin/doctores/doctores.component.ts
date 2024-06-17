import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';
import { DoctoresService } from 'src/app/core/services/doctores.service';
import { DataTypeDoctores } from 'src/app/core/models/doctores';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css'],
})
export class DoctoresComponent {

  private destroy$ = new Subject<any>();

  request = true;
  loading = true;

  currentPage: number = 0;
  metadata!: DataMetadata;

  elementForm: {
    formulario: string;
    title: string;
  } = { formulario: '', title: '' };

  paciente: DataTypeDoctores[] = [];

  arrFiltros: any = [
    

    {
      type: 'search',
      name: 'Buscar',
      filter: false,
      description: 'Activo',
      kind: [
        { name: 'Nombre', parameter: 'str_per_nombre' },
        {
          name: 'Apellido',
          parameter: 'str_per_apellido',
        },
        {
          name: 'Número de Cédula ',
          parameter: 'str_per_cedula',
        },
        {
          name: 'Correo Electrónico',
          parameter: 'str_per_correo',
        },
        { name: 'Número de Teléfono', parameter: 'str_per_telefono' },
      ],
    },
    {
      name: 'Estado',
      type: 'status',
      filter: false,
      parameter: 'str_per_estado',
      kind: [
        { name: 'Activo', parameter: 'ACTIVO' },
        { name: 'Inactivo', parameter: 'INACTIVO' },
      ],
    },
  ];

  constructor(
    public srvDoctores: DoctoresService,
    private srvModal: ModalService
  ){}

  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando Datos Doctores...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      this.loading = false;
    }, 400);

    console.log('DoctoresComponent ', this.srvDoctores.doctor);

    this.srvDoctores.obtenerDoctor({
      order: [{ parameter: 'id_per_persona', direction: 'DESC' }],
    });

    this.srvDoctores.selectedDoctor$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.paciente = data;
        this.request = false;
        Swal.close();
      });

    this.srvDoctores.selectedMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
      });

  }

  setFilters(filter: any) {
    console.log(filter);
    this.request = true;
    this.srvDoctores.obtenerDoctor(filter);
  }

  cleanFilters() {
    this.request = true;
    this.srvDoctores.obtenerDoctor({
      order: [{ parameter: 'id_per_persona', direction: 'DESC' }],
    });
  }

  seleccionarInput(tipo: string, data: DataTypeDoctores, title: string) {
    this.elementForm = { formulario: tipo, title };
    this.srvModal.setFormModal(this.elementForm);
    this.srvDoctores.setUpdateDoctor(data);
    this.srvModal.openModal();
  }

  nextPage(page: number) {
    this.request = true;
    this.srvDoctores.obtenerDoctor({
      pagination: { limit: 10, page },
      order: [{ parameter: 'id_per_persona', direction: 'DESC' }],
    });
  }

  cambiarEstado(id: number, estado: string) {
    Swal.fire({
      title: `Está seguro que desea ${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } El Estado del Doctor?`,
      text: 'Este cambio puede ser revertido en cualquier momento',
      showDenyButton: true,
      confirmButtonText: `${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } Estado Paciente`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiando estado del Doctor...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvDoctores
          .deleteDoctor(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: `Sector ${
                    estado === 'ACTIVO' ? 'Desactivado' : 'Activado'
                  } correctamente`,
                  showDenyButton: false,
                  confirmButtonText: 'Aceptar',
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: resp.message,
                  text: 'Algo salió mal',
                });
              }

              this.srvDoctores.obtenerDoctor({
                order: [{ parameter: 'id_per_persona', direction: 'DESC' }],
              });
            },
            error: (err) => {
              console.log('ERROR CREATE RESPONSABLE', err);
              this.request = false;
              Swal.fire({
                title: 'Error al cambiar el estado del Responsable',
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
              this.request = false;
            },
          });
      } else if (result.isDenied) {
        Swal.fire(
          `No se ${
            estado === 'ACTIVO' ? 'Desactivo' : 'Activo'
          } el estado del Doctor!`,
          '',
          'info'
        );
      }
    });
  }
}
