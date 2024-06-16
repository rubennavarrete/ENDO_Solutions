import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.css'],
})
export class FailedComponent {
  constructor(private readonly router: Router) {}

  regresarHome() {
    this.router.navigate(['/']);
  }
}
