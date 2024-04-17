import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { GymMember, Sexo } from 'src/app/model/GymMember';
import { GymmemberService } from 'src/app/service/gymMember.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockGymMemberService: jasmine.SpyObj<GymmemberService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockGymMemberService = jasmine.createSpyObj('GymmemberService', [
      'GetMembers',
    ]);
    mockGymMemberService.GetMembers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: GymmemberService, useValue: mockGymMemberService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialog', () => {
    it('should open dialog', () => {
      // Arrange
      const mockDialogRef = jasmine.createSpyObj('MatDialogRef', [
        'afterClosed',
      ]);
      mockDialogRef.afterClosed.and.returnValue(of({}));
      mockDialog.open.and.returnValue(mockDialogRef);

      // Act
      component.openDialog();

      // Assert
      expect(mockDialog.open).toHaveBeenCalled();
    });
  });

  describe('deleteRecord', () => {
    it('should delete record', fakeAsync(() => {
      // Arrange
      const mockMember: GymMember = {
        nome: 'John Doe',
        email: 'john@example.com',
        dataNascimento: '2000-01-01',
        sexo: Sexo.M,
      };
      component.dataSource.data = [mockMember];
      const mockDialogRef = jasmine.createSpyObj('MatDialogRef', [
        'afterClosed',
      ]);
      mockDialogRef.afterClosed.and.returnValue(of(true));
      mockDialog.open.and.returnValue(mockDialogRef);

      // Act
      component.deleteRecord(mockMember);
      tick();

      // Assert
      expect(component.dataSource.data.length).toBe(0);
    }));
  });

  // Add more test cases for other methods if needed
});
