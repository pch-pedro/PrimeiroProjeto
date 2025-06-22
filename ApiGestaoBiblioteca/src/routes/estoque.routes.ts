import { Router } from "express";
import { EstoqueController } from "../controller/EstoqueController";

const router = Router();
const controleEstoque = new EstoqueController();

router.post('/', (req, res) => {
    controleEstoque.cadastrar(req, res);
});

router.get('/', (req, res) => {
    controleEstoque.listar(req, res);
});

router.get('/:id', (req, res) => {
    controleEstoque.buscar(req, res);
});

router.put('/:id', (req, res) => {
    controleEstoque.atualizar(req, res);
});

router.delete('/:id', (req, res) => {
    controleEstoque.remover(req, res);
});

export default router;