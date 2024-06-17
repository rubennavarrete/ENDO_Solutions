import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import { DataTypePacientes } from 'src/app/core/models/pacientes';
import { ModalService } from 'src/app/core/services/modal.service';
import { PacientesService } from 'src/app/core/services/pacientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit, OnDestroy {
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

  menuTabsSelected = 0;
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
      title: 'Cargando Datos Pasientes...',
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

  cambiarEstado(id: number, estado: string) {}

  setFilters(filter: any) {
    // console.log(filter);
    this.request = true;
    this.srvPacientes.obtenerPaciente(filter);
  }

  cleanFilters() {
    this.request = true;
    this.srvPacientes.obtenerPaciente({
      order: [{ parameter: 'id_pac_paciente', direction: 'DESC' }],
    });
  }

  seleccionarInput(tipo: string, data: DataTypePacientes, title: string) {
    this.elementForm = { formulario: tipo, title };
    this.srvModal.setFormModal(this.elementForm);
    this.srvPacientes.setUpdatePaciente(data);
    this.srvModal.openModal();
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
