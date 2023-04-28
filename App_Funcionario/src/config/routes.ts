import { Router } from "express";
import { FuncionarioController } from "../controllers/funcionario.controller";

const router: Router = Router();

router.get("/funcionario", new FuncionarioController().listar);
router.get("/funcionario/:id", new FuncionarioController().buscar);
router.post(
  "/funcionario/:idFuncionario/:nome/:idCpf?",
  new FuncionarioController().cadastrar
);

export { router };
