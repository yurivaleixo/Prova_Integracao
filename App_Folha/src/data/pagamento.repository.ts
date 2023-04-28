import { PrismaClient } from "@prisma/client";
import { Pagamento } from "../models/pagamento.model";

let pagamentos: Pagamento[] = [];

const prisma = new PrismaClient();

export class PagamentoRepository {
  async listar(): Promise<Pagamento[]> {
    return await prisma.pagamento.findMany();
  }

  async cadastrar(pagamento: Pagamento | null): Promise<Pagamento> {
    await prisma.pagamento.create({
      data: {
        mes: pagamento!.mes,
        ano: pagamento!.ano,
        horas: pagamento!.horas,
        valor: pagamento!.valor
      },
    });
    return pagamento!;
  }

  async buscar(id: number): Promise<Pagamento | null> {
    return await prisma.pagamento.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deletar(idPagamento: number): Promise<Pagamento | null> {
    try {
      const pagamento = await prisma.pagamento.delete({
        where: {
          id: idPagamento,
        },
      });
      return pagamento;
    } catch {
      return null;
    }
  }

  async alterar(pagamento: Pagamento | null): Promise<Pagamento | null> {
    try {
      const pagamentoAlterado = await prisma.pagamento.update({
        where: {
          id: pagamento?.id,
        },
        data: {
            mes: pagamento!.mes,
            ano: pagamento!.ano,
            horas: pagamento!.horas,
            valor: pagamento!.valor
        },
      });
      return pagamento;
    } catch {
      return null;
    }
  }
}
