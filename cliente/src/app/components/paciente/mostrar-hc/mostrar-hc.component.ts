import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import { DataTypeHistorialConsulta } from 'src/app/core/models/historial-consulta';
import { ModalService } from 'src/app/core/services/modal.service';
import { HistorialConsultaService } from 'src/app/core/services/historial-consulta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-hc',
  templateUrl: './mostrar-hc.component.html',
  styleUrls: ['./mostrar-hc.component.css']
})
export class MostrarHCComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();

  request = true;
  loading = true;

  currentPage: number = 0;
  metadata!: DataMetadata;
  idPaciente: number = -1;


  elementForm: {
    formulario: string;
    title: string;
  } = { formulario: '', title: '' };

  historialConsulta: DataTypeHistorialConsulta[] = [];

  arrFiltros: any = [
    {
      name: 'Fecha de Consulta',
      type: 'date',
      filter: false,
      description: 'Activo',
      kind: [ 'Igual a ', 'Mes ', 'Entre '],
    },

    {
      type: 'search',
      name: 'Buscar',
      filter: false,
      description: 'Activo',
      kind: [
        { name: 'Motivo', parameter: 'str_con_motivo' },
        {
          name: 'Diagnóstico',
          parameter: 'str_con_diagnostico',
        },
        {
          name: 'Tratamiento',
          parameter: 'str_con_tratamiento',
        },
        {
          name: 'Recomendaciones',
          parameter: 'str_con_recomendaciones',
        },
        { name: 'Observaciones', parameter: 'str_con_observaciones' },
      ],
    },
    {
      name: 'Estado',
      type: 'status',
      filter: false,
      parameter: 'str_con_estado',
      kind: [
        { name: 'Activo', parameter: 'ACTIVO' },
        { name: 'Inactivo', parameter: 'INACTIVO' },
      ],
    },
  ];

  constructor(
    
    public srvHistorialConsulta: HistorialConsultaService,
    private srvModal: ModalService
  ) {
    srvModal.selectId$.pipe().subscribe((id) => {
      this.idPaciente = id;
      console.log('ID', this.idPaciente);
    });
  }

  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando Historias Clinicas...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.srvHistorialConsulta.getHConsulta({
      id_con_paciente: this.idPaciente,
      order: [{ parameter: 'id_con_consulta', direction: 'DESC' }],
    });

    this.srvHistorialConsulta.selectedHistorialConsulta$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.historialConsulta = data;
        this.request = false;
        Swal.close();
      });

    this.srvHistorialConsulta.selectedMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
      });
    
  }

  cambiarEstado(id: number, estado: string) {
    Swal.fire({
      title: `Está seguro que desea ${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } El Estado del historial del consulta?`,
      text: 'Este cambio puede ser revertido en cualquier momento',
      showDenyButton: true,
      confirmButtonText: `${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } Estado Consulta`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiando estado de la Consulta...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvHistorialConsulta
          .deleteHistorialConsulta(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: `Historia de consulta ${
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

              this.srvHistorialConsulta.getHConsulta({
                order: [{ parameter: 'id_con_consulta', direction: 'DESC' }],
              });
            },
            error: (err) => {
              console.log('ERROR CREATE RESPONSABLE', err);
              this.request = false;
              Swal.fire({
                title: 'Error al cambiar el estado de la historia de consulta',
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
          } el estado del Historial de consulta!`,
          '',
          'info'
        );
      }
    });
  }

  setFilters(filter: any) {
    //agregar el id del paciente
    filter.id_con_paciente = this.idPaciente;
    console.log(filter);
    this.request = true;
    this.srvHistorialConsulta.getHConsulta(filter);
  }

  cleanFilters() {
    this.request = true;
    this.srvHistorialConsulta.getHConsulta({
      id_con_paciente: this.idPaciente,
      order: [{ parameter: 'id_con_consulta', direction: 'DESC' }],
    });
  }

  seleccionarInput(tipo: string, data: DataTypeHistorialConsulta, title: any) {
    this.elementForm = { formulario: tipo, title };
    this.srvModal.setFormModal(this.elementForm);
    //id de consulta  es el id para editar
    this.srvModal.setId(data.id_con_consulta);
    this.srvHistorialConsulta.setUpdateHC(data);
  }

  nextPage(page: number) {
    this.request = true;
    this.srvHistorialConsulta.getHConsulta({
      id_con_paciente: this.idPaciente,
      pagination: { limit: 10, page },
      order: [{ parameter: 'id_con_consulta', direction: 'DESC' }],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
