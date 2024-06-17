import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'filter-tab',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Input() loading: boolean = false;
  @Input() arrFiltros: any = [];
  hasFilters: boolean = false;

  @Output() acctionNext: EventEmitter<any> = new EventEmitter();
  @Output() cleanFilters: EventEmitter<any> = new EventEmitter();
  @Output() cleanOneFilter: EventEmitter<any> = new EventEmitter();

  // Filtrados
  @Output() searchFilter: EventEmitter<any> = new EventEmitter();
  @Output() statusFilter: EventEmitter<any> = new EventEmitter();
  @Output() setFilters: EventEmitter<any> = new EventEmitter();

  selectTypeOfSearchDate: number = 0;

  constructor() {}
  onChangeSelectFecha(e: Event) {
    this.selectTypeOfSearchDate = parseInt(
      (e.target as HTMLInputElement).value
    );
  }

  setDateFilter() {
    this.hasFilters = true;
    this.arrFiltros[0].filter = true;

    if (this.selectTypeOfSearchDate == 0) {
      let numOfDM = (document.getElementById('inputNumberDMToFilter') as any)!
        .value;
      if (!numOfDM) numOfDM = 0;
      const typeOfDM = (document.getElementById('selectTypeDM') as any)!.value;

      this.arrFiltros[0].description =
        this.arrFiltros[0].kind[this.selectTypeOfSearchDate] +
        ' ' +
        numOfDM +
        ' ' +
        (typeOfDM === 'DAYS' ? 'Días' : 'Meses');
      const today = new Date();
      if (typeOfDM === 'DAYS') {
        today.setDate(today.getDate() + (parseInt(numOfDM) || 0));
      } else {
        today.setMonth(today.getMonth() + (numOfDM || 0));
      }

      this.setFilters.emit({
        filter: {
          date: {
            parameter: 'dt_pac_fecha_nacimiento',
            data: {
              date_start: new Date(),
              date_end: today,
            },
          },
        },
      });
    }

    if (this.selectTypeOfSearchDate == 1) {
      const daySelected = (document.getElementById('daySelectedFilter') as any)!
        .value;
      this.arrFiltros[0].description =
        this.arrFiltros[0].kind[this.selectTypeOfSearchDate] + daySelected;
      const dFinal = new Date(daySelected);
      this.setFilters.emit({
        filter: {
          date: {
            parameter: 'dt_pac_fecha_nacimiento',
            data: {
              date_start: dFinal,
              date_end: dFinal, //dFinal.setDate(dFinal.getDate()),
            },
          },
        },
      });
    }

    if (this.selectTypeOfSearchDate == 2) {
      const monthToSearch = (document.getElementById(
        'monthSelectedFilter'
      ) as any)!.value;
      this.arrFiltros[0].description =
        this.arrFiltros[0].kind[this.selectTypeOfSearchDate] + monthToSearch;
      const dFinal = new Date(monthToSearch);
      const finMes = new Date(dFinal.getFullYear(), dFinal.getMonth() + 2, 0);
      this.setFilters.emit({
        filter: {
          date: {
            parameter: 'dt_pac_fecha_nacimiento',
            data: {
              date_start: dFinal,
              date_end: finMes, //dFinal.setDate(dFinal.getDate()),
            },
          },
        },
      });
    }

    if (this.selectTypeOfSearchDate == 3) {
      const startDay = (document.getElementById(
        'betweenSelectedFilterStart'
      ) as any)!.value;
      const endDay = (document.getElementById(
        'betweenSelectedFilterEnd'
      ) as any)!.value;
      this.arrFiltros[0].description =
        this.arrFiltros[0].kind[this.selectTypeOfSearchDate] +
        '(' +
        startDay +
        ') y (' +
        endDay +
        ')';

      this.setFilters.emit({
        filter: {
          date: {
            parameter: 'dt_pac_fecha_nacimiento',
            data: {
              date_start: startDay,
              date_end: endDay, //dFinal.setDate(dFinal.getDate()),
            },
          },
        },
      });
    }
  }

  setSearchFilter() {
    const index = this.arrFiltros.findIndex(
      (item: any) => item.type === 'search'
    );
    this.hasFilters = true;
    let typeOfSearch = (document.getElementById(
      'selectTypeOfSearchText'
    ) as any)!.value;
    let inputSearch = (document.getElementById('inputSearch') as any)!.value;

    this.arrFiltros[index].filter = true;
    this.arrFiltros[index].description =
      this.arrFiltros[index].kind[typeOfSearch].name + ' "' + inputSearch + '"';
    const respuesta = {
      filter: {
        like: {
          parameter: this.arrFiltros[index].kind[typeOfSearch].parameter,
          data: inputSearch,
        },
      },
    };

    this.setFilters.emit(respuesta);
  }

  onItemChange(target: any) {
    this.hasFilters = true;

    const valueFilterStatus = target.value;

    const index = this.arrFiltros.findIndex(
      (item: any) => item.type === 'status'
    );
    this.arrFiltros[index].kind.forEach((element: any) => {
      if (element.parameter === valueFilterStatus) {
        element.status = true;
        this.arrFiltros[index].filter = true;
        this.arrFiltros[index].description = 'Estado: ' + valueFilterStatus;
      } else {
        element.status = false;
      }
    });

    // this.arrFiltros[index].filter = true;
    // this.arrFiltros[index].description = 'Estado: ' + valueFilterStatus;
    const respuesta = {
      filter: {
        status: {
          parameter: this.arrFiltros[index].parameter, // enum_estado_contratista

          data: valueFilterStatus,
        },
      },
    };
    this.setFilters.emit(respuesta);
  }

  limpiarFiltros() {
    this.hasFilters = false;
    this.arrFiltros.forEach((element: any) => {
      element.filter = false;
    });
    this.cleanFilters.emit();
  }

  eliminarFiltro(index: number) {
    this.arrFiltros[index].filter = false;
    const itemWithFilter = this.arrFiltros.find(
      (item: any, index: number) => item.filter
    );
    if (!itemWithFilter) {
      this.hasFilters = false;
    }
    this.cleanFilters.emit();
  }
}
