import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  loading: boolean = false;

  @Input() dataLength: any = [];
  @Input() metadata: any = [];
  @Input() currentPage: any = 0;

  // Eventos
  @Output() nextPage: EventEmitter<any> = new EventEmitter();
  nextPageDir(dir: number) {
    this.currentPage = this.currentPage + 1 * (dir === 1 ? 1 : -1);
    this.nextPage.emit(this.currentPage);
  }
}
