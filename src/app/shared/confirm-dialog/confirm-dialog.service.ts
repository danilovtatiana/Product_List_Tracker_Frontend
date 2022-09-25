import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, take } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
  constructor(private _dialog: MatDialog) {}
  dialogRef?: MatDialogRef<ConfirmDialogComponent>;

  public open(options: {
    title: string;
    message: string;
    cancelText: string;
    confirmText: string;
  }) {
    this.dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef!.afterClosed().pipe(
      take(1),
      map((response) => {
        return response;
      })
    );
  }
}
