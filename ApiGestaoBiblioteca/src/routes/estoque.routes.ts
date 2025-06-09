import { Router } from "express";
import { EstoqueController } from "../controller/EstoqueController";

const router = Router();
const controleEstoque = new EstoqueController();

router.post('/', (req, res, next) => {
    controleEstoque.cadastrar(req, res, next);
});

router.get('/', (req, res, next) => {
    controleEstoque.listar(req, res, next);
});

router.get('/:id', (req, res, next) => {
    controleEstoque.buscar(req, res, next);
});

router.put('/:id', (req, res, next) => {
    controleEstoque.atualizar(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    controleEstoque.remover(req, res, next);
});

export default router;