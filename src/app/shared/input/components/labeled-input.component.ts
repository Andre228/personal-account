import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-labeled-input',
  template: `
    <div class="form-group">
          <label *ngIf="labelText">{{labelText}}</label>
          <input [type]="type" 
                 [class]="getClass()"
                 [(ngModel)]="value"
                 (change)="change($event)"
                 [required]="required"/>
          <small *ngIf="isVisibleDescriptionStatic()" class="form-text text-muted">{{description}}</small>
          <small *ngIf="isVisibleDescriptionDynamic()" class="form-text text-muted">{{value}}</small>
    </div>
  `
})
export class AppLabeledInputComponent implements OnInit {

  @Input() labelText: string = '';
  @Input() description: string = '';
  @Input() class: string = '';
  @Input() value: string = '';
  @Input() type: string = '';

  @Input() descriptionDynamic: boolean = false;
  @Input() required: boolean = false;

  @Output() changeEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {

  }

  getClass(): string {
    return `form-control ${this.class}`;
  }

  change(event): void {
    this.changeEvent.emit(this.value);
  }

  isVisibleDescriptionStatic(): boolean {
    return this.description && !this.descriptionDynamic && this.type !== 'password';
  }

  isVisibleDescriptionDynamic(): boolean {
    return this.descriptionDynamic && this.type !== 'password';
  }

}

