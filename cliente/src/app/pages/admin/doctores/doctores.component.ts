import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css'],
})
export class DoctoresComponent {
  ngOnInit(): void {
    Swal.fire({
      title: 'Cargando Datos Doctores...',
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
