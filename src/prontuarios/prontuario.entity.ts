import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Paciente } from '../pacientes/paciente.entity';
import { Medico } from '../medicos/medico.entity';
import { Consulta } from '../consultas/consulta.entity';
import { Diagnostico } from '../diagnosticos/diagnostico.entity';
import { TesteAplicado } from '../testes-aplicados/teste-aplicado.entity';
import { Documento } from '../documentos/documento.entity';

@Entity()
export class Prontuario {
  @PrimaryGeneratedColumn()
  ProntuarioID: number;

  @Column()
  PacienteID: number;

  @Column()
  MedicoResponsavelID: number;

  @Column({ type: 'text' })
  QueixaPrincipal: string;

  @Column({ type: 'text', nullable: true })
  HistoricoQueixa: string;

  @Column({ type: 'text', nullable: true })
  HistoricoPessoalFamiliar: string;

  @Column({ type: 'text', nullable: true })
  HistoricoMedico: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  DataAbertura: Date;

  @Column({ default: 'Ativo' })
  StatusProntuario: string;

  @Column({ type: 'date', nullable: true })
  DataEncerramento: Date;

  @Column({ type: 'text', nullable: true })
  MotivoEncerramento: string;

  @Column({ type: 'text', nullable: true })
  ResumoFinal: string;

  // --- Relacionamentos ---

  @ManyToOne(() => Paciente, (paciente) => paciente.prontuarios)
  @JoinColumn({ name: 'PacienteID' }) // Especifica qual coluna usamos para o 'join'
  paciente: Paciente;

  @ManyToOne(() => Medico, (medico) => medico.prontuariosResponsavel)
  @JoinColumn({ name: 'MedicoResponsavelID' })
  medicoResponsavel: Medico;

  @OneToMany(() => Consulta, (consulta) => consulta.prontuario)
  consultas: Consulta[];

  @OneToMany(() => Diagnostico, (diagnostico) => diagnostico.prontuario)
  diagnosticos: Diagnostico[];

  @OneToMany(() => TesteAplicado, (teste) => teste.prontuario)
  testesAplicados: TesteAplicado[];

  @OneToMany(() => Documento, (documento) => documento.prontuario)
  documentos: Documento[];
}
