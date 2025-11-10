// A "mensagem" do comando. É parecida com o DTO.
export class CreateEmployeeCommand {
  constructor(
    public readonly name: string,
    public readonly managerId: number,
    public readonly contactInfo: { phone: string; email: string },
  ) {}
}
