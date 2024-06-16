import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denied',
  templateUrl: './denied.component.html',
  styleUrls: ['./denied.component.css'],
})
export class DeniedComponent {
  constructor(private readonly router: Router) {}

  loguear() {
    this.router.navigate(['login']);
  }
}
