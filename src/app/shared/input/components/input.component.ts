import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <div [class]="getClass()">
      <div *ngIf="text" class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-default">{{text}}</span>
      </div>
      <input [type]="type" 
             class="form-control" 
             aria-label="Sizing example input" 
             aria-describedby="inputGroup-sizing-default"
             [placeholder]="placeholder"
             [(ngModel)]="value"
             (change)="change()"
             (keyup)="keyup()"
             (focusout)="focusout()"/>
    </div>
  `
})
export class AppInputComponent implements OnInit {

  @Input() type: string = '';
  @Input() text: string = '';
  @Input() class: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';

  @Output() changeEvent = new EventEmitter<string>();
  @Output() keyupEvent = new EventEmitter<string>();
  @Output() focusoutEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {

  }

  getClass(): string {
    return `input-group ${this.class} pull-right`;
  }

  focusout() {
    this.focusoutEvent.emit(this.value)
  }

  change() {
    this.changeEvent.emit(this.value);
  }

  keyup() {
    this.keyupEvent.emit(this.value);
  }

}

