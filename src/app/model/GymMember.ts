export interface GymMember {
  pessoaId?: number;
  nome: string;
  email: string;
  dataNascimento?: string;
  sexo: Sexo | undefined;
}

export enum Sexo {
  M = 'M',
  F = 'F',
}
