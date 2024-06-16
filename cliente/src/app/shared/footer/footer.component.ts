import { Component } from '@angular/core';
import config from 'config/config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  version = config.VERSION;
}
