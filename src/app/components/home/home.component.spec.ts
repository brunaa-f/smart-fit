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

  describe('applyFilter', () => {
    it('should filter data', () => {
      // Arrange
      const mockMembers: GymMember[] = [
        {
          nome: 'John Doe',
          email: 'john@example.com',
          dataNascimento: '2000-01-01',
          sexo: Sexo.M,
        },
        {
          nome: 'Jane Smith',
          email: 'jane@example.com',
          dataNascimento: '1995-05-15',
          sexo: Sexo.F,
        },
      ];
      component.dataSourceGeral = mockMembers;
      component.dataSource.data = mockMembers;

      // Act
      component.applyFilter({ target: { value: 'John' } } as any);

      // Assert
      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0].nome).toBe('John Doe');
    });

    it('should filter case-insensitive', () => {
      // Arrange
      const mockMembers: GymMember[] = [
        {
          nome: 'John Doe',
          email: 'john@example.com',
          dataNascimento: '2000-01-01',
          sexo: Sexo.M,
        },
        {
          nome: 'Jane Smith',
          email: 'jane@example.com',
          dataNascimento: '1995-05-15',
          sexo: Sexo.F,
        },
      ];
      component.dataSourceGeral = mockMembers;
      component.dataSource.data = mockMembers;

      // Act
      component.applyFilter({ target: { value: 'doe' } } as any);

      // Assert
      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0].nome).toBe('John Doe');
    });

    it('should reset filter when input value is empty', () => {
      // Arrange
      const mockMembers: GymMember[] = [
        {
          nome: 'John Doe',
          email: 'john@example.com',
          dataNascimento: '2000-01-01',
          sexo: Sexo.M,
        },
        {
          nome: 'Jane Smith',
          email: 'jane@example.com',
          dataNascimento: '1995-05-15',
          sexo: Sexo.F,
        },
      ];
      component.dataSourceGeral = mockMembers;
      component.dataSource.data = mockMembers;
      component.applyFilter({ target: { value: 'John' } } as any);

      // Act
      component.applyFilter({ target: { value: '' } } as any);

      // Assert
      expect(component.dataSource.filteredData.length).toBe(2);
    });
  });
});
