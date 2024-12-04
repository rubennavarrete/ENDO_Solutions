import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { DataTypeProcesos } from 'src/app/core/models/procesos';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.css']
})
export class ProcesosComponent {

  private destroy$ = new Subject<any>();
  

  request = true;
  loading = true;

  currentPage: number = 0;
  metadata!: DataMetadata;

  elementForm: {
    formulario: string;
    title: string;
  } = { formulario: '', title: '' };

  proceso: DataTypeProcesos[] = [];
  arrFiltros: any = [
    {
      type: 'search',
      name: 'Buscar',
      filter: false,
      description: 'Activo',
      kind: [
        { name: 'Nombre', parameter: 'str_proc_nombre' },
        {
          name: 'Descripción',
          parameter: 'str_proc_descripcion',
        }
      ],
    },
    {
      name: 'Estado',
      type: 'status',
      filter: false,
      parameter: 'str_proc_estado',
      kind: [
        { name: 'Activo', parameter: 'ACTIVO' },
        { name: 'Inactivo', parameter: 'INACTIVO' },
      ],
    },
  ];

  constructor(
    public srvProcesos: ProcesosService,
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

    this.srvProcesos.obtenerProceso({
      order: [{ parameter: 'id_proc_proceso', order: 'DESC' }],
    })

    this.srvProcesos.selectedProceso$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.proceso = data;
        this.request = false;
        Swal.close();
      });

    this.srvProcesos.selectedMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
      });

  }

  setFilters(filter: any) {
    console.log(filter);
    this.request = true;
    this.srvProcesos.obtenerProceso(filter);
  }

  cleanFilters() {
    this.request = true;
    this.srvProcesos.obtenerProceso({
      order: [{ parameter: 'id_proc_proceso', order: 'DESC' }],
    });
  }

  seleccionarInput(tipo: string, data: DataTypeProcesos, title: string) {
    this.elementForm = { formulario: tipo, title };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.setId(data.id_proc_proceso);
    this.srvProcesos.setUpdateProceso(data);
    this.srvModal.openModal();
  }

  nextPage(page: number) {
    this.request = true;
    this.srvProcesos.obtenerProceso({
      order: [{ parameter: 'id_proc_proceso', order: 'DESC' }],
    });
  }

  cambiarEstado(id: number, estado: string) {
    Swal.fire({
      title: `Está seguro que desea ${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } El Estado del Proceso?`,
      text: 'Este cambio puede ser revertido en cualquier momento',
      showDenyButton: true,
      confirmButtonText: `${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } Estado del Proceso`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiando estado del Proceso...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvProcesos.deleteProceso(id)
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

              this.srvProcesos.obtenerProceso({
                order: [{ parameter: 'id_proc_proceso', order: 'DESC' }],
              });
            },
            error: (err) => {
              this.request = false;
              Swal.fire({
                title: 'Error al cambiar el estado del Proceso',
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
          } el estado del Proceso!`,
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
