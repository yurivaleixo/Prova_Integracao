import { PagamentoRepository } from "../data/pagamento.repository";
import { Request, Response } from "express";
import { Pagamento } from "../models/pagamento.model";

const repository = new PagamentoRepository();
//produto

export class PagamentoController {
  async listar(request: Request, response: Response) {
    const pagamento = await repository.listar();
    return response.status(200).json({
      message: "ok",
      data: pagamento,
    });
  }

  async cadastrar(request: Request, response: Response) {
    let pagamento: Pagamento | null = request.body;

    pagamento = await repository.cadastrar(pagamento);

    return response.status(201).json({
      message: "Pagamento cadastrado!",
      data: pagamento,
    });
  }

  async buscar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);

    const pagamento = await repository.buscar(id);

    if (!pagamento) {
      return response.status(404).json({ message: "Pagamento não encontrado" });
    }

    return response.status(200).json({
      message: "ok",
      data: pagamento,
    });
  }

  async deletar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);
    let pagamento = await repository.deletar(id);

    if (!pagamento) {
      return response.status(404).json({ message: "Pagamento não encontrado" });
    }

    return response.status(200).json({
      message: "ok",
      data: pagamento,
    });
  }

  async alterar(request: Request, response: Response) {
    let pagamento: Pagamento | null = request.body;
    pagamento = await repository.alterar(pagamento);

    if (!pagamento) {
      return response.status(404).json({ message: "Pagamento não encontrado" });
    }

    return response.status(200).json({
      message: "Pagamento alterado",
      data: pagamento,
    });
  }
}
