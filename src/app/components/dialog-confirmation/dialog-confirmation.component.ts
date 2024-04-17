import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent {
  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>) {}

  closeDialog(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
