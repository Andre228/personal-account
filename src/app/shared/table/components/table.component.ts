import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table',
  template: `
    <table class="table table-hover">
      <thead>
        <tr>
          <th *ngFor="let headerColumn of tableHeader" scope="col">{{ headerColumn }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="c-p row-section" *ngFor="let tableRow of tableBody; let i = index">
          <th scope="row">{{ i+1 }}</th>
          <td *ngFor="let cell of tableRow | keyvalue">{{ cell.value }}</td>
          <div class="row">
            <span (click)="rowClick('delete', i)" class="trash">&#10006;</span>
            <span (click)="rowClick('edit', i)" class="pen">&#9998;</span>
          </div>
        </tr>
      </tbody>
    </table>
  `
})
export class AppTableComponent implements OnInit {

  @Input() tableHeader: string [] = [];
  @Input() tableBody: any [] = [];

  @Output() clickEvent = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<number>();

  isUpdating: boolean = false;


  constructor() {}

  ngOnInit() {

  }

  rowClick(isUpdating: string, index: number) {
    if (isUpdating === 'edit') {
      this.clickEvent.emit(index);
    } else if (isUpdating === 'delete') {
      this.deleteEvent.emit(index);
    }
  }

}

