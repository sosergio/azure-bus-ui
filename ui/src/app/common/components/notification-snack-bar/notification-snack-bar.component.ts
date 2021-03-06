import { MatSnackBar } from '@angular/material';
import { MatSnackBarConfig } from '@angular/material';
import { NotificationService, NotificationType } from './../../services/notification-service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-notification-snack-bar',
  template: ``
})
export class NotificationSnackBarComponent {

  constructor(notificationService: NotificationService, public snackBar: MatSnackBar) {
    notificationService.notification
      .subscribe(notification => {
        if (notification == null) {
          this.snackBar.dismiss();
        }
        else {
          let css = notification.type == NotificationType.error ? 'snack-bar-error' : (notification.type == NotificationType.success ? 'snack-bar-success' : 'snack-bar-info');
          let options: MatSnackBarConfig = {
            extraClasses: [css]
          };
          if (!notification.sticky) {
            options.duration = 5000;
          }
          let button = notification.sticky ? null : 'DISMISS';
          let stringify = notification.text;
          this.snackBar.open(stringify, button, options);
        }
      });
  }
}
