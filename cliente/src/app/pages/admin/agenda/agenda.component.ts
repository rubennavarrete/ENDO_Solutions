import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {
  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando Datos Agenda...',
      didOpen: () => {
        Swal.showLoading();
        // this.isLoading = true
        // this.isData = true
      },
    });
    setTimeout(() => {
      Swal.close();
    }, 700);
  }
}
