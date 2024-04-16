import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GymMember } from 'src/app/model/GymMember';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.scss'],
})
export class DialogRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GymMember
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      nome: this.data?.nome || '',
      email: this.data?.email || '',
      dataNascimento: this.data?.dataNascimento || '',
      sexo: this.data?.sexo || '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.dialogRef.close({
        ...this.registrationForm.value,
        originalData: this.data,
      });
    }
  }
}
