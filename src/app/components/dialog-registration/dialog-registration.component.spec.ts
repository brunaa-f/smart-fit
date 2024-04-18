import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { DialogRegistrationComponent } from './dialog-registration.component';

describe('DialogRegistrationComponent', () => {
  let component: DialogRegistrationComponent;
  let fixture: ComponentFixture<DialogRegistrationComponent>;
  let dialogRef: MatDialogRef<DialogRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogRegistrationComponent],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            nome: 'Nome de Exemplo',
            email: 'exemplo@email.com',
            dataNascimento: new Date(),
            sexo: 'Masculino',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogRegistrationComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with provided data', () => {
    expect(component.registrationForm.value).toEqual({
      nome: 'Nome de Exemplo',
      email: 'exemplo@email.com',
      dataNascimento: jasmine.any(Date),
      sexo: 'Masculino',
    });
  });

  it('should close dialog when onCancelClick is called', () => {
    spyOn(dialogRef, 'close');
    component.onCancelClick();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog with form values and original data when onSubmit is called and form is valid', () => {
    component.registrationForm.setValue({
      nome: 'Novo Nome',
      email: 'novo@email.com',
      dataNascimento: new Date(),
      sexo: 'Feminino',
    });
    spyOn(dialogRef, 'close');
    component.onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith({
      nome: 'Novo Nome',
      email: 'novo@email.com',
      dataNascimento: jasmine.any(Date),
      sexo: 'Feminino',
      originalData: {
        nome: 'Nome de Exemplo',
        email: 'exemplo@email.com',
        dataNascimento: jasmine.any(Date),
        sexo: 'Masculino',
      },
    });
  });
});
