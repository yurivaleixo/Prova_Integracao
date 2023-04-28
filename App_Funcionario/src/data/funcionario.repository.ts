import { Funcionario } from './../models/funcionario.model';

let funcionarios: Funcionario[] = [];

export class FuncionarioRepository {
  listar(): Funcionario[] {
    return funcionarios;
  }

  cadastrar(funcionario: Funcionario): Funcionario {
    funcionarios.push(funcionario);
    return funcionario;
  }

  buscar(idCpf: string): Funcionario[] {
    return funcionarios.filter((p) => p.cpfId === idCpf)!;
  }
}
