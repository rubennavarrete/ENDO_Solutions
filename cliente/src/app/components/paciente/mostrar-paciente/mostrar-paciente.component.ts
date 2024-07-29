import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import { DataTypePacientes } from 'src/app/core/models/pacientes';
import { ModalService } from 'src/app/core/services/modal.service';
import { PacientesService } from 'src/app/core/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-paciente',
  templateUrl: './mostrar-paciente.component.html',
  styleUrls: ['./mostrar-paciente.component.css'],
})
export class MostrarPacienteComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();

  request = true;
  loading = true;

  currentPage: number = 0;
  metadata!: DataMetadata;

  elementForm: {
    formulario: string;
    title: string;
  } = { formulario: '', title: '' };

  paciente: DataTypePacientes[] = [];

  arrFiltros: any = [
    // {
    //   name: 'Fecha de Nacimiento',
    //   type: 'date',
    //   filter: false,
    //   description: 'Activo',
    //   kind: ['En los proximos ', 'Igual a ', 'Mes ', 'Entre '],
    // },

    {
      type: 'search',
      name: 'Buscar',
      filter: false,
      description: 'Activo',
      kind: [
        { name: 'Nombre', parameter: 'str_pac_nombre' },
        {
          name: 'Apellido',
          parameter: 'str_pac_apellido',
        },
        {
          name: 'Número de Cédula ',
          parameter: 'str_pac_cedula',
        },
        {
          name: 'Correo Electrónico',
          parameter: 'str_pac_correo',
        },
        { name: 'Número de Teléfono', parameter: 'str_pac_telefono' },
      ],
    },
    {
      name: 'Estado',
      type: 'status',
      filter: false,
      parameter: 'str_pac_estado',
      kind: [
        { name: 'Activo', parameter: 'ACTIVO' },
        { name: 'Inactivo', parameter: 'INACTIVO' },
      ],
    },
  ];

  constructor(
    private srvModal: ModalService,
    public srvPacientes: PacientesService
  ) {}

  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando Datos Pacientes...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      this.loading = false;
    }, 400);
    

    this.srvPacientes.obtenerPaciente({
      order: [{ parameter: 'id_pac_paciente', direction: 'DESC' }],
    });

    this.srvPacientes.selectedPaciente$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.paciente = data;
        this.request = false;
        Swal.close();
      });

    this.srvPacientes.selectedMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
      });
  }

  cambiarEstado(id: number, estado: string) {
    Swal.fire({
      title: `Está seguro que desea ${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } El Estado del Paciente?`,
      text: 'Este cambio puede ser revertido en cualquier momento',
      showDenyButton: true,
      confirmButtonText: `${
        estado === 'ACTIVO' ? 'Desactivar' : 'Activar'
      } Estado Paciente`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cambiando estado del Paciente...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvPacientes
          .deletePaciente(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: `Paciente ${
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

              this.srvPacientes.obtenerPaciente({
                order: [{ parameter: 'id_pac_paciente', direction: 'DESC' }],
              });
            },
            error: (err) => {
              console.log('ERROR CREATE RESPONSABLE', err);
              this.request = false;
              Swal.fire({
                title: 'Error al cambiar el estado del Paciente',
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
          } el estado del Paciente!`,
          '',
          'info'
        );
      }
    });
  }

  setFilters(filter: any) {
    // console.time('BuscarPaciente');
    console.log(filter);
    this.request = true;
    this.srvPacientes.obtenerPaciente(filter);
  }

  cleanFilters() {
    this.request = true;
    this.srvPacientes.obtenerPaciente({
      order: [{ parameter: 'id_pac_paciente', direction: 'DESC' }],
    });
  }

  seleccionarInput(tipo: string, data: DataTypePacientes, title: any) {
    this.srvModal.setNombrePaciente(data.str_pac_nombre+' '+data.str_pac_apellido);
    this.elementForm = { formulario: tipo, title };
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.setId(data.id_pac_paciente);
    this.srvPacientes.setUpdatePaciente(data);
  }

  nextPage(page: number) {
    this.request = true;
    this.srvPacientes.obtenerPaciente({
      pagination: { limit: 10, page },
      order: [{ parameter: 'id_pac_paciente', direction: 'DESC' }],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
