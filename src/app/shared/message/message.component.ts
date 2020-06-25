import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temError()" class="ui-message ui-messages-error">
      {{ text }}
    </div>
  `,
  styles: [`
    .ui-message {
      color: #fff;
      margin-top: 3px;
      background-color: red;
    }
  `]
})
export class MessageComponent {

  @Input() control: FormControl;
  @Input() error: string;
  @Input() text: string;

  temError() {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
