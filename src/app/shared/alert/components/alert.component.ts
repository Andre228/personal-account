import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div class="mt-4">
      <alert *ngIf="text && type" [type]="type" [dismissOnTimeout]="ALERT_DISMISS_TIMEOUT" (onClosed)="onClosed()">{{ text }}</alert>
    </div>
  `
})
export class AppAlertComponent implements OnInit, OnChanges {

  readonly ALERT_DISMISS_TIMEOUT = 5000;

  @Input() type: string = '';
  @Input() text: string = '';

  @Output() clearInputDataEvent = new EventEmitter<void>();

  constructor() {}

  ngOnChanges() {
    if (this.text && this.type) {
      setTimeout(() => {
        this.clearInputDataEvent.emit();
      }, this.ALERT_DISMISS_TIMEOUT);
    }
  }

  ngOnInit() {}

  onClosed(): void {}

}

