import { Router } from "express";
import { EmprestimoController } from "../controller/EmprestimoController";

const controleEmprestimo = new EmprestimoController();
const router = Router();

router.post("/emprestimos", (req, res) => {
    controleEmprestimo.cadastrar(req, res);
});

router.get("/emprestimos", (req, res) => {
    controleEmprestimo.listar(req, res);
});

router.put("/emprestimos/:id/devolucao", (req, res) => {
    controleEmprestimo.devolver(req, res);
});

export default router;