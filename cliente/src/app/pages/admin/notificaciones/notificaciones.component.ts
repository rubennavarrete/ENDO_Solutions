import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProcesosService } from 'src/app/core/services/procesos.service';
import { DataTypeProcesos } from 'src/app/core/models/procesos';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {
  // private destroy$ = new Subject<any>();
  

  // request = true;
  // loading = true;

  // currentPage: number = 0;
  // metadata!: DataMetadata;

  // elementForm: {
  //   formulario: string;
  //   title: string;
  // } = { formulario: '', title: '' };

  // proceso: DataTypeProcesos[] = [];
  // arrFiltros: any = [
  //   {
  //     type: 'search',
  //     name: 'Buscar',
  //     filter: false,
  //     description: 'Activo',
  //     kind: [
  //       { name: 'Nombre', parameter: 'str_proc_nombre' },
  //       {
  //         name: 'Descripción',
  //         parameter: 'str_proc_descripcion',
  //       }
  //     ],
  //   },
  //   {
  //     name: 'Estado',
  //     type: 'status',
  //     filter: false,
  //     parameter: 'str_proc_estado',
  //     kind: [
  //       { name: 'Pendiente', parameter: 'PENDIENTE' },
  //       { name: 'Enviado', parameter: 'ENVIADO' },
  //     ],
  //   },
  // ];

  // constructor(
  //   public srvProcesos: ProcesosService,
  //   private srvModal: ModalService
  // ) {
  // }

  // ngOnInit() {
  //   Swal.fire({
  //     title: 'Cargando Datos...',
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 400);

  //   this.srvProcesos.obtenerProceso({
  //     order: [{ parameter: 'id_proc_proceso', order: 'DESC' }],
  //   })

  //   this.srvProcesos.selectedProceso$
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data) => {
  //       this.proceso = data;
  //       this.request = false;
  //       Swal.close();
  //     });

  //   this.srvProcesos.selectedMetadata$
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((data) => {
  //       this.metadata = data;
  //     });

  // }

  // setFilters(filter: any) {
  //   console.log(filter);
  //   this.request = true;
  //   this.srvProcesos.obtenerProceso(filter);
  // }

  

  // // Cambiar el estado de una notificación a "ENVIADO"
  // enviarNotificacion(id: number): void {
  //   const notificacion = this.notificaciones.find((n) => n.id === id);
  //   if (notificacion) {
  //     notificacion.estado = 'ENVIADO';
  //     console.log(`Notificación enviada: ${notificacion.nombres}`);
  //   }
  // }

  // // Eliminar una notificación
  // eliminarNotificacion(id: number): void {
  //   this.notificaciones = this.notificaciones.filter((n) => n.id !== id);
  //   console.log(`Notificación eliminada con ID: ${id}`);
  // }

  // cleanFilters() {
  //   this.request = true;
  //   this.srvProcesos.obtenerProceso({
  //     order: [{ parameter: 'id_proc_proceso', order: 'DESC' }],
  //   });
  // }

  // seleccionarInput(tipo: string, data: DataTypeProcesos, title: string) {
  //   this.elementForm = { formulario: tipo, title };
  //   this.srvModal.setFormModal(this.elementForm);
  //   this.srvModal.setId(data.id_proc_proceso);
  //   this.srvProcesos.setUpdateProceso(data);
  //   this.srvModal.openModal();
  // }

  // nextPage(page: number) {
  //   this.request = true;
  //   this.srvProcesos.obtenerProceso({
  //     order: [{ parameter: 'id_proc_proceso', order: 'DESC' }],
  //   });
  // }

  // cambiarEstado(id: number, estado: string) {
  //   Swal.fire({
  //     title: `Está seguro que desea ${
  //       estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
  //     } El Estado del Proceso?`,
  //     text: 'Este cambio puede ser revertido en cualquier momento',
  //     showDenyButton: true,
  //     confirmButtonText: `${
  //       estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
  //     } Estado del Proceso`,
  //     denyButtonText: `Cancelar`,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: 'Cambiando estado del Proceso...',
  //         didOpen: () => {
  //           Swal.showLoading();
  //         },
  //       });
  //       this.request = true;
  //       this.srvProcesos.deleteProceso(id)
  //         .pipe(takeUntil(this.destroy$))
  //         .subscribe({
  //           next: (resp: any) => {
  //             if (resp.status) {
  //               Swal.close();
  //               Swal.fire({
  //                 icon: 'success',
  //                 title: `Sector ${
  //                   estado === 'ACTIVO' ? 'Desactivado' : 'Activado'
  //                 } correctamente`,
  //                 showDenyButton: false,
  //                 confirmButtonText: 'Aceptar',
  //               });
  //             } else {
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: resp.message,
  //                 text: 'Algo salió mal',
  //               });
  //             }

  //             this.srvProcesos.obtenerProceso({
  //               order: [{ parameter: 'id_proc_proceso', order: 'DESC' }],
  //             });
  //           },
  //           error: (err) => {
  //             this.request = false;
  //             Swal.fire({
  //               title: 'Error al cambiar el estado del Proceso',
  //               text: 'Por favor comuníquese con el servicio técnico',
  //               icon: 'error',
  //               footer:
  //                 err.error.message +
  //                 '\n' +
  //                 (err.error.errores ? JSON.stringify(err.error.errores) : ''),
  //               showDenyButton: false,
  //               confirmButtonText: 'Aceptar',
  //             });
  //           },
  //           complete: () => {
  //             this.request = false;
  //           },
  //         });
  //     } else if (result.isDenied) {
  //       Swal.fire(
  //         `No se ${
  //           estado === 'ACTIVO' ? 'Desactivo' : 'Activo'
  //         } el estado del Proceso!`,
  //         '',
  //         'info'
  //       );
  //     }
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.destroy$.next({});
  //   this.destroy$.complete();
  // }

  // loading: boolean = false; // Simula el estado de carga
  // request: boolean = false; // Simula la solicitud al servidor

  // // Datos simulados
  // notificaciones = [
  //   {
  //     id: 1,
  //     nombres: 'Juan Pérez',
  //     fecha: '2024-12-04',
  //     telefono: '123456789',
  //     estado: 'PENDIENTE',
  //   },
  //   {
  //     id: 2,
  //     nombres: 'Ana López',
  //     fecha: '2024-12-03',
  //     telefono: '987654321',
  //     estado: 'ENVIADO',
  //   },
  //   {
  //     id: 3,
  //     nombres: 'Carlos Ramírez',
  //     fecha: '2024-12-02',
  //     telefono: '456123789',
  //     estado: 'PENDIENTE',
  //   },
  // ];

  // // Cambiar el estado de una notificación a "ENVIADO"
  // enviarNotificacion(id: number): void {
  //   const notificacion = this.notificaciones.find((n) => n.id === id);
  //   if (notificacion) {
  //     notificacion.estado = 'ENVIADO';
  //     console.log(`Notificación enviada: ${notificacion.nombres}`);
  //   }
  // }

  // // Eliminar una notificación
  // eliminarNotificacion(id: number): void {
  //   this.notificaciones = this.notificaciones.filter((n) => n.id !== id);
  //   console.log(`Notificación eliminada con ID: ${id}`);
  // }

  // notificaciones = [
  //   { nombres: 'Juan Pérez', fecha: '2024-12-01', telefono: '0999778684', estado: 'PENDIENTE' },
  //   { nombres: 'Ana Gómez', fecha: '2024-12-02', telefono: '0986479545', estado: 'ENVIADO' },
  // ];
  // loading = true;

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 1000); // Simula un retraso de carga
  // }

  notificaciones = [
    { id: 1, nombres: 'Homero Ojeda', fecha: '2024-12-05', telefono: '0999778684', estado: 'PENDIENTE' },
    { id: 2, nombres: 'Ana Gómez', fecha: '2024-12-06', telefono: '09986479548', estado: 'ENVIADO' },
  ];
  loading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  cambiarEstado(id: number, nuevoEstado: string): void {
    const notificacion = this.notificaciones.find((n) => n.id === id);
    if (notificacion) {
      Swal.fire({
        title: 'Enviando...',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Actualiza el estado de la notificación
      notificacion.estado = nuevoEstado;
      console.log(`Notificación con ID ${id} actualizada a estado: ${nuevoEstado}`);

      // Muestra el Swal con el mensaje de éxito después de un pequeño retraso
      setTimeout(() => {
        Swal.fire({
          title: 'Enviado con éxito!',
          text: `La notificación de ${notificacion.nombres} fue actualizada a estado: ${nuevoEstado}`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }, 1000);  // Aquí se define el retraso para que se vea la animación de "Enviando..."
    }
  }
}

