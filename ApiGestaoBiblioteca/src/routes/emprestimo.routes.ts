import { Router } from "express";
import { EmprestimoController } from "../controller/EmprestimoController";

const controleEmprestimo = new EmprestimoController();
const router = Router();

router.post("/emprestimos", (req, res, next) => {
    controleEmprestimo.cadastrar(req, res, next);
});

router.get("/emprestimos", (req, res, next) => {
    controleEmprestimo.listar(req, res, next);
});

router.put("/emprestimos/:id/devolucao", (req, res, next) => {
    controleEmprestimo.devolver(req, res, next);
});

export default router;