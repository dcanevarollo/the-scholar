import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

enum SnackBarType {
  ERROR = 'error',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private matSnackBar: MatSnackBar) { }

  showError(message: string, action?: string, duration?: number): void {
    this.showSnackBar(message, SnackBarType.ERROR, action, duration);
  }

  showSuccess(message: string,  action?: string, duration?: number): void {
    this.showSnackBar(message, SnackBarType.SUCCESS, action, duration);
  }

  private showSnackBar(
    message: string,
    type: SnackBarType,
    action = 'Dismiss',
    duration = 5000
  ): void {
    let panelClass;
    if (type === SnackBarType.SUCCESS) {
      message = `Success! ${message}!`;
      panelClass = 'app-snack-bar-success';
    } else {
      message = `Ops! ${message}.`;
      panelClass = 'app-snack-bar-error';
    }

    this.matSnackBar.open(message, action, { duration, panelClass });
  }

}
