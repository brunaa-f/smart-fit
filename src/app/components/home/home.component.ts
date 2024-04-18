import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GymMember, Sexo } from 'src/app/model/GymMember';
import { GymmemberService } from 'src/app/service/gymMember.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegistrationComponent } from '../dialog-registration/dialog-registration.component';

const EMPTY_STRING: string = '';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private gymMemberService: GymmemberService
  ) {}

  dataSource: MatTableDataSource<GymMember> = new MatTableDataSource<GymMember>(
    []
  );
  dataSourceGeral: GymMember[] = [];
  displayedColumns: string[] = [
    'nome',
    'email',
    'dataNascimento',
    'sexo',
    'actions',
  ];

  ngOnInit(): void {
    this.gymMemberService.GetMembers().subscribe((data: any[]) => {
      const formattedData: GymMember[] = data.map((item) => ({
        nome: item.Nome || item.nome || EMPTY_STRING,
        email: item.Email || item.email || EMPTY_STRING,
        dataNascimento:
          item.DataNascimento || item.dataNascimento || EMPTY_STRING,
        sexo: item.Sexo === 'M' ? Sexo.M : Sexo.F,
      }));

      this.dataSource.data = formattedData;
      this.dataSourceGeral = formattedData;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogRegistrationComponent, {});

    dialogRef.afterClosed().subscribe((result: GymMember | undefined) => {
      if (result !== undefined && this.isMemberNotEmpty(result)) {
        this.dataSource.data.push(result);
        this.updateLocalStorageAndTable();
      }
    });
  }

  private isMemberNotEmpty(member: GymMember): boolean {
    return Object.values(member).some(
      (value) => value !== EMPTY_STRING && value !== null
    );
  }

  editRecord(member: GymMember): void {
    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
      data: member,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.dataSource.data.findIndex(
          (item) => item === result.originalData
        );
        if (index !== -1) {
          this.dataSource.data[index] = { ...result };
          this.updateLocalStorageAndTable();
        }
      }
    });
  }

  private updateLocalStorageAndTable(): void {
    const alunosStorageKey = 'alunos';

    localStorage.setItem(
      alunosStorageKey,
      JSON.stringify(this.dataSource.data)
    );
    this.dataSource = new MatTableDataSource<GymMember>(this.dataSource.data);
  }

  deleteRecord(element: GymMember): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.data.indexOf(element);
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
          this.updateLocalStorageAndTable();
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.dataSourceGeral.filter((member) =>
      member.nome.toLowerCase().includes(filterValue.trim().toLowerCase())
    );

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
