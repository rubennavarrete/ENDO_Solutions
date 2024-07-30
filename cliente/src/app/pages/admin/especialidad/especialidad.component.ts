import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';
import { EspecialidadService } from 'src/app/core/services/especialidad.service';
import { DataTypeEspecialidad } from 'src/app/core/models/especialidad';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent {

  private destroy$ = new Subject<any>();

  request = true;
  loading = true;

  currentPage: number = 0;
  metadata!: DataMetadata;

  elementForm: {
    formulario: string;
    title: string;
  } = { formulario: '', title: '' };

  especialidad: DataTypeEspecialidad[] = [];
  arrFiltros: any = [
    {
      type: 'search',
      name: 'Buscar',
      filter: false,
      description: 'Activo',
      kind: [
        { name: 'Nombre', parameter: 'str_esp_nombre' },
        {
          name: 'Descripción',
          parameter: 'str_esp_descripcion',
        }
      ],
    },
    {
      name: 'Estado',
      type: 'status',
      filter: false,
      parameter: 'str_esp_estado',
      kind: [
        { name: 'Activo', parameter: 'ACTIVO' },
        { name: 'Inactivo', parameter: 'INACTIVO' },
      ],
    },
  ];

  constructor(
    public srvEspecialidad: EspecialidadService,
    private srvModal: ModalService
  ) {
  }

  ngOnInit() {
    Swal.fire({
      title: 'Cargando Datos...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      this.loading = false;
    }, 400);


    this.srvEspecialidad.obtenerEspecialidad({
      order: [{ parameter: 'id_esp_especialidad', order: 'DESC' }],
    })

    this.srvEspecialidad.selectedEspecialidad$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.especialidad = data;
        this.request = false;
        Swal.close();
      });

    this.srvEspecialidad.selectedMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
      });

  }

  setFilters(filter: any) {
    console.log(filter);
    this.request = true;
    this.srvEspecialidad.obtenerEspecialidad(filter);
  }

  cleanFilters() {
    this.request = true;
    this.srvEspecialidad.obtenerEspecialidad({
      order: [{ parameter: 'id_esp_especialidad', order: 'DESC' }],
    })
  }

  seleccionarInput(tipo: string, data: DataTypeEspecialidad, title: string) {
    this.elementForm = { formulario: tipo, title };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.setId(data.id_esp_especialidad);
    this.srvEspecialidad.setUpdateEspecialidad(data);
    this.srvModal.openModal();
  }

  nextPage(page: number) {
    this.request = true;
    this.srvEspecialidad.obtenerEspecialidad({
      order: [{ parameter: 'id_esp_especialidad', order: 'DESC' }],
    })
  }

  cambiarEstado(id: number, estado: string) {
    Swal.fire({
      title: `Está seguro que desea ${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } El Estado de la especialidad?`,
      text: 'Este cambio puede ser revertido en cualquier momento',
      showDenyButton: true,
      confirmButtonText: `${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } Estado de la especialidad`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiando estado del Especialidad...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvEspecialidad.deleteEspecialidad(id)
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

              this.srvEspecialidad.obtenerEspecialidad({
                order: [{ parameter: 'id_esp_especialidad', order: 'DESC' }],
              })
            },
            error: (err) => {
              this.request = false;
              Swal.fire({
                title: 'Error al cambiar el estado de la especialidad',
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
          } el estado de la especialidad!`,
          '',
          'info'
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
