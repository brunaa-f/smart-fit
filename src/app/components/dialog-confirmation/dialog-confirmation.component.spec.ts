import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation.component';

describe('DialogConfirmationComponent', () => {
  let component: DialogConfirmationComponent;
  let fixture: ComponentFixture<DialogConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmationComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with true when closeDialog(true) is called', () => {
    // Arrange
    const matDialogRefSpy = TestBed.inject(MatDialogRef);

    // Act
    component.closeDialog(true);

    // Assert
    expect(matDialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when closeDialog(false) is called', () => {
    // Arrange
    const matDialogRefSpy = TestBed.inject(MatDialogRef);

    // Act
    component.closeDialog(false);

    // Assert
    expect(matDialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog without arguments when onCancelClick() is called', () => {
    // Arrange
    const matDialogRefSpy = TestBed.inject(MatDialogRef);

    // Act
    component.onCancelClick();

    // Assert
    expect(matDialogRefSpy.close).toHaveBeenCalledOnceWith();
  });
});
