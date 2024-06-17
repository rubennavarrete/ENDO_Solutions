import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataMetadata } from 'src/app/core/models/metadata';
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
