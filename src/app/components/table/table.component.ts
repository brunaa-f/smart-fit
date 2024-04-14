import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GymMember, Sexo } from 'src/app/model/GymMember';
import { GymmemberService } from 'src/app/service/gymMember.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private gymMemberService: GymmemberService) {}

  dataSource: MatTableDataSource<GymMember> = new MatTableDataSource<GymMember>(
    []
  );
  dataSourceGeral: GymMember[] = [];

  ngOnInit(): void {
    this.gymMemberService.GetMembers().subscribe((data: any[]) => {
      const formattedData: GymMember[] = data.map((item) => ({
        nome: item.Nome || item.nome || '',
        email: item.Email || item.email || '',
        dataNascimento: item.DataNascimento || item.dataNascimento || '',
        sexo: item.Sexo === 'M' ? Sexo.M : Sexo.F,
      }));

      this.dataSource.data = formattedData;
    });
  }
  displayedColumns: string[] = [
    'nome',
    'email',
    'dataNascimento',
    'sexo',
    'actions',
  ];

  editRecord(element: GymMember) {
    console.log('Edit:', element);
  }

  deleteRecord(element: GymMember) {
    console.log('Delete:', element);
  }
}
