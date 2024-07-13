import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import config from 'config/config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit, OnDestroy {
  baseUrl = config.URL_BASE_PATH;
  private destroy$ = new Subject<any>();
  menuTabsSelected: number = 0;

  constructor(
    private srvModal: ModalService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  public titleModal: string = '';
  public tipoFormulario: string = '';

  vista!: boolean;
  menus: any[] = [{}, {}];
  loading: boolean = false;
  request: boolean = false;
  arrFiltros: any = [];

  tipoVista: string = 'uno';

  listaViews: any = {
    INFO_PERSONAL: 0,
    INFO_MEDICA: 1,
    HISTORIAL_CONSULTA: 2,
  };

  ngOnInit(): void {
    const path: string = window.location.pathname.split('/').pop() ?? '';
    this.menuTabsSelected = this.listaViews[path.toUpperCase()] || 0;

    this.srvModal.selectFormModal$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Entro a editar data => ', data);
        console.log('menuTabsSelected => ', this.menuTabsSelected);
        this.titleModal = data.title;
        this.tipoFormulario = data.formulario;
        if (this.titleModal !== '') {
          this.tipoVista = 'dos';
          console.log('tipoVista => ', this.tipoVista);
        }
      });
  }

  seleccionarVista(vista: string) {
    this.tipoVista = vista;
    this.location.replaceState(`${this.baseUrl}/pacientes`);
    this.cdr.detectChanges();
  }

  agregarPaciente() {
    // this.router.navigate([`/${this.baseUrl}/pacientes/info_personal`]);
    this.menuTabsSelected = 0;
    this.tipoVista = 'dos';
    this.tipoFormulario = 'nuevoPaciente';

    this.cdr.detectChanges();
    this.titleModal = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
