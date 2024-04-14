import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export enum Sexo {
  M = 'Masculino',
  F = 'Feminino',
}

export interface GymMember {
  nome: string;
  email: string;
  dataNascimento: Date;
  sexo: Sexo;
}

const ELEMENT_DATA: GymMember[] = [
  {
    nome: 'Joao Mendes',
    email: 'Hydrogen@gmail.com',
    dataNascimento: new Date(),
    sexo: Sexo.M,
  },
  {
    nome: 'Maria Pereira',
    email: 'Helium@gmail.com',
    dataNascimento: new Date(),
    sexo: Sexo.F,
  },
  {
    nome: 'Helena dos Santos',
    email: 'Lithium@gmail.com',
    dataNascimento: new Date(),
    sexo: Sexo.F,
  },
  {
    nome: 'Mario Cortella',
    email: 'Beryllium@gmail.com',
    dataNascimento: new Date(),
    sexo: Sexo.M,
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  displayedColumns: string[] = [
    'nome',
    'email',
    'dataNascimento',
    'sexo',
    'actions',
  ];
  dataSource = new MatTableDataSource<GymMember>(ELEMENT_DATA);

  editRecord(element: GymMember) {
    console.log('Edit:', element);
  }

  deleteRecord(element: GymMember) {
    console.log('Delete:', element);
  }
}
