import { Router } from "express";
import { PagamentoController } from "../controllers/pagamento.controller";

const router: Router = Router();

//Pagamento
router.get("/pagamento", new PagamentoController().listar);
router.get("/pagamento/:id", new PagamentoController().buscar);
router.post("/pagamento", new PagamentoController().cadastrar);
router.delete("/pagamento/:id", new PagamentoController().deletar);
router.put("/pagamento", new PagamentoController().alterar);

export { router };
