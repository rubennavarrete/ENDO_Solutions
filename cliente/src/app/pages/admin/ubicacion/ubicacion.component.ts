import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';
import { UbicacionService } from 'src/app/core/services/ubicacion.service';
import { DataTypeUbicacion } from 'src/app/core/models/ubicacion';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent {

  private destroy$ = new Subject<any>();

  request = true;
  loading = true;

  currentPage: number = 0;
  metadata!: DataMetadata;

  elementForm: {
    formulario: string;
    title: string;
  } = { formulario: '', title: '' };

  ubicacion: DataTypeUbicacion[] = [];
  arrFiltros: any = [
  
    {
      type: 'search',
      name: 'Buscar',
      filter: false,
      description: 'Activo',
      kind: [
        { name: 'Nombre', parameter: 'str_ubi_nombre' },
        {
          name: 'Descripción',
          parameter: 'str_ubi_descripcion',
        }
      ],
    },
    {
      name: 'Estado',
      type: 'status',
      filter: false,
      parameter: 'str_ubi_estado',
      kind: [
        { name: 'Activo', parameter: 'ACTIVO' },
        { name: 'Inactivo', parameter: 'INACTIVO' },
      ],
    },
  ];

  constructor(
    public srvUbicacion: UbicacionService,
    private srvModal: ModalService
  ) {
    
  }

  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando Datos...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.srvUbicacion.obternerUbicaciones({
      order: [{ parameter: 'id_ubi_ubicacion', order: 'DESC' }],
    });

    this.srvUbicacion.selectedUbicacion$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.ubicacion = data;
        this.request = false;
        Swal.close();
      });

    this.srvUbicacion.selectedMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
        // this.loading = false;
      });
  }

  setFilters(filter: any) {
    console.log(filter);
    this.request = true;
    this.srvUbicacion.obternerUbicaciones(filter);
  }

  cleanFilters() {
    this.request = true;
    this.srvUbicacion.obternerUbicaciones({
      order: [{ parameter: 'id_ubi_ubicacion', order: 'DESC' }],
    });
  }

  seleccionarInput(tipo: string, data: DataTypeUbicacion, title: string) {
    this.elementForm = { formulario: tipo, title };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.setId(data.id_ubi_ubicacion);
    this.srvUbicacion.setUpdateUbicacion(data);
    this.srvModal.openModal();
  }

  nextPage(page: number) {
    this.request = true;
    this.srvUbicacion.obternerUbicaciones({
      order: [{ parameter: 'id_ubi_ubicacion', order: 'DESC' }],
    });
  }

  cambiarEstado(id: number, estado: string) {
    Swal.fire({
      title: `Está seguro que desea ${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } El Estado de la Ubicación?`,
      text: 'Este cambio puede ser revertido en cualquier momento',
      showDenyButton: true,
      confirmButtonText: `${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } Estado de Ubicación`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiando estado de la Ubicación...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvUbicacion.deleteUbicacion(id)
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

              this.srvUbicacion.obternerUbicaciones({
                order: [{ parameter: 'id_ubi_ubicacion', order: 'DESC' }],
              });
            },
            error: (err) => {
              this.request = false;
              Swal.fire({
                title: 'Error al cambiar el estado de la Ubicación',
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
          } el estado de la Ubicación!`,
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
