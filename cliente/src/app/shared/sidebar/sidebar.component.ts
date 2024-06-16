import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import config from 'config/config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  baseUrl: string = config.URL_BASE_PATH;

  // list_menu se pasa por el componente desde full-layout.component.ts
  @Input() list_menu: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let sidebar = document.querySelector('.sidebar');
    let sidebarBtn = document.querySelector('#btn-swap-sidebar');
    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener('click', () => {
        sidebar?.classList.toggle('close');
      });
    }
  }
  openSubMenu(e: any, path: string) {
    let arrowParentA = e.target.parentElement;
    const lastChildInMenuItem = arrowParentA.lastElementChild.tagName;
    if (lastChildInMenuItem === 'I' || lastChildInMenuItem === 'UL') {
      let arrowParentClick = arrowParentA.parentElement;
      arrowParentClick.classList.toggle('showMenu');
    } else {
      path = this.baseUrl + path;
      this.router.navigate([path]);
    }
  }
}
