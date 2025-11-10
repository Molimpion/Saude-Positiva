// src/pacientes/queries/get-paciente.query.ts

// A Query só precisa do ID para a busca
export class GetPacienteQuery {
  constructor(public readonly id: number) {}
}
