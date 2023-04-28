import { Request, Response } from "express";
import crypto from "crypto";
import axios from "axios";
import { FuncionarioRepository } from "../data/funcionario.repository";
import { Funcionario } from "../models/funcionario.model";

const repositoryFuncionario = new FuncionarioRepository();

export class FuncionarioController {
  listar(request: Request, response: Response) {
    const funcionarios = repositoryFuncionario.listar();
    return response.status(200).json({
      message: "ok",
      data: funcionarios,
    });
  }

  async cadastrar(request: Request, response: Response) {
    let { idFuncionario, nome, idCpf } = request.params;

    let funcionario: Funcionario = {};

    await axios
      .get(`http://localhost:3000/pagamento/${idFuncionario}`)
      .then((resposta) => {
        funcionario = {
          funcionario: resposta.data.data,
          nome: nome,
          cpfId: idCpf,
        };

        if (!idCpf) {
          funcionario.cpfId = crypto.randomUUID();
        }

        funcionario = repositoryFuncionario.cadastrar(funcionario);

        return response.status(201).json({
          message: "Pagamento efetivado!",
          data: funcionario,
        });
      })
      .catch((erro) => {
        return response.status(404).json({
          message: erro.response.data.message,
        });
      });
  }

  buscar(request: Request, response: Response) {
    const { id } = request.params;

    const funcionarios = repositoryFuncionario.buscar(id);

    return response.status(200).json({
      message: "ok",
      data: funcionarios,
    });
  }
}
