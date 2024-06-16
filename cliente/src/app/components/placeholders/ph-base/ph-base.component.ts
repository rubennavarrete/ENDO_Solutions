import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ph-base',
  templateUrl: './ph-base.component.html',
  styleUrls: ['./ph-base.component.css'],
})
export class PhBaseComponent {
  @Input() loading: any;
  constructor() {}
}
