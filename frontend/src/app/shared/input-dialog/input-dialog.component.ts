import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent {
  title: string;
  message: string;
  input: string;
  okBtn: string;


  constructor(public dialogRef: MatDialogRef<InputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InputDialogModel) {
    this.title = data.title;
    this.message = data.message;
    this.input = data.input;
    this.okBtn = data.okBtn;
  }

  onYes(): void {
    this.dialogRef.close(this.input);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class InputDialogModel {

  constructor(
    public title: string,
    public message: string,
    public input: string,
    public okBtn: string) {
  }
}
