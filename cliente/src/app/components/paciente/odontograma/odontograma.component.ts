import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';
import { OdontogramaService } from 'src/app/core/services/odontograma.service';
import { DataTypeOdontograma } from 'src/app/core/models/odontograma';

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent {

  private destroy$ = new Subject<any>();
  elementForm: {
    formulario: string;
    title: string;
  } = { formulario: '', title: '' };

  teethUpper: string[] = [
    '18', '17', '16', '15', '14', '13', '12', '11',
    '21', '22', '23', '24', '25', '26', '27', '28',
  ];
  teethLower: string[] = [
    '48', '47', '46', '45', '44', '43', '42', '41',
    '31', '32', '33', '34', '35', '36', '37', '38',
  ];
  selectedTooth: string | null = null;
  toothStatus: { [key: string]: string } = {};

  selectTooth(tooth: string): void {
    this.elementForm = { formulario: 'agregarOdonto', title: 'Diente '+tooth};
    this.srvModal.setFormModal(this.elementForm);
    this.srvModal.setId(this.idPaciente);
    this.srvModal.openModal();


    console.log("se abre")
    this.selectedTooth = tooth;
  }

  saveToothStatus(): void {
    if (this.selectedTooth) {
      console.log(
        `Estado del diente ${this.selectedTooth}: ${this.toothStatus[this.selectedTooth]}`
      );
      alert(
        `Estado del diente ${this.selectedTooth} guardado como: ${this.toothStatus[this.selectedTooth]}`
      );
      this.selectedTooth = null; // Deseleccionar después de guardar
    }
  }

  request = true;
  loading = true;

  currentPage: number = 0;
  metadata!: DataMetadata;
  idPaciente: number = -1;

  

  odontograma: DataTypeOdontograma[] = [];

  arrFiltros: any = [
    {
      name: 'Fecha de Registro',
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
        { name: 'Número de Diente', parameter: 'int_odo_diente' },
        {
          name: 'Diagnóstico',
          parameter: 'str_odo_diagnostico',
        },
        {
          name: 'Cara del Diente',
          parameter: 'str_odo_cara',
        }
      ],
    },
    // {
    //   name: 'Estado',
    //   type: 'status',
    //   filter: false,
    //   parameter: 'str_con_estado',
    //   kind: [
    //     { name: 'Activo', parameter: 'ACTIVO' },
    //     { name: 'Inactivo', parameter: 'INACTIVO' },
    //   ],
    // },
  ];

  constructor(
    
    public srvOdontograma: OdontogramaService,
    private srvModal: ModalService
  ) {
    srvModal.selectId$.pipe().subscribe((id) => {
      this.idPaciente = id;
      console.log('ID', this.idPaciente);
    });
  }

  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando Odontograma...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      this.loading = false;
    }, 400);

    this.srvOdontograma.getlistOdontograma({
      id_odo_paciente: this.idPaciente,
      order: [{ parameter: 'id_odo_odontograma', direction: 'DESC' }],
    });

    this.srvOdontograma.selectedOdontograma$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.odontograma = data;
        this.request = false;
        Swal.close();
      });

    this.srvOdontograma.selectedMetadata$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.metadata = data;
      });
    
  }

  nextPage(page: number) {
    this.request = true;
    this.srvOdontograma.getlistOdontograma({
      id_odo_paciente: this.idPaciente,
      pagination: { limit: 10, page },
      order: [{ parameter: 'id_odo_odontograma', direction: 'DESC' }],
    });
  }

  cleanFilters() {
    this.request = true;
    this.srvOdontograma.getlistOdontograma({
      id_odo_paciente: this.idPaciente,
      order: [{ parameter: 'id_odo_odontograma', direction: 'DESC' }],
    });
  }

  setFilters(filter: any) {
    filter.id_odo_paciente = this.idPaciente;
    this.request = true;
    this.srvOdontograma.getlistOdontograma(filter);
  }

  seleccionarInput(tipo: string, data: DataTypeOdontograma, title: any) {
    this.elementForm = { formulario: tipo, title };
    this.srvModal.setFormModal(this.elementForm);
    //id de consulta  es el id para editar
    this.srvModal.setId(data.id_odo_paciente);
    this.srvOdontograma.setUpdateOdontograma(data);
    this.srvModal.openModal();

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  eliminar(id: number) {
    Swal.fire({
      title: `Está seguro que desea eliminar?`,
      text: 'Este no cambio puede ser revertido',
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Eliminando...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.request = true;
        this.srvOdontograma
          .deleteOdontograma(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (resp: any) => {
              if (resp.status) {
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: `Odontograma eliminado con éxito`,
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

              this.srvOdontograma.getlistOdontograma({
                id_odo_paciente: this.idPaciente,
                order: [{ parameter: 'id_odo_odontograma', direction: 'DESC' }],
              });
            },
            error: (err) => {
              console.log('ERROR CREATE RESPONSABLE', err);
              this.request = false;
              Swal.fire({
                title: 'Error al eliminar dato',
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
          
          `No se logró eliminar el dato!`,
          '',
          'info'
        );
      }
    });
  }
}
