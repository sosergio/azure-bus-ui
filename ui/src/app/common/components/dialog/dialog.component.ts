import { Component } from '@angular/core';

@Component({
  selector: 'dcas-dialog',
  template: `
    <ng-container [ngSwitch]="type">
      <div *ngSwitchCase="'confirm'" class="dcas-dialog small">
        <h3>{{title}}</h3>
        <p>{{message}}</p>
        <div class="buttons">
          <button class="button primary" [mat-dialog-close]="true"><span class="material-icons">done</span>Confirm</button>
          <button class="button secondary" [mat-dialog-close]="false"><span class="material-icons">clear</span>Close</button>
        </div>
      </div>

      <div *ngSwitchCase="'alert'" class="dcas-dialog small">
        <h3>{{title}}</h3>
        <p>{{message}}</p>
        <div class="buttons">
          <button class="button primary" [mat-dialog-close]="true"><span class="material-icons">done</span>Ok</button>
        </div>
      </div>

      <div *ngSwitchCase="'prompt'" class="dcas-dialog">
        <h3>{{title}}</h3>
        <p>
          <label>{{message}}</label>
          <textarea #reasonText></textarea>
        </p>
        <div class="buttons">
          <button class="button primary" [disabled]="reasonText.value == null || reasonText.value == ''" [mat-dialog-close]="reasonText.value"><span class="material-icons">done</span>Confirm</button>
          <button class="button secondary" [mat-dialog-close]="null"><span class="material-icons">clear</span>Close</button>
        </div>
      </div>
    </ng-container>
  `,
})

export class DialogComponent {
  title: string;
  message: string = null;
  type: string;
}
