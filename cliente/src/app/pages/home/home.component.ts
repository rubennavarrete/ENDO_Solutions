import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import config from 'config/config';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = true;
  request = true;
  orderby!: string;
  version = config.VERSION;

  private destroy$ = new Subject<any>();

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2200);

    this.request = false;
  }

  autenticar() {
    this.router.navigate(['login']);
    // this.router.navigate(['pacientes']);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
