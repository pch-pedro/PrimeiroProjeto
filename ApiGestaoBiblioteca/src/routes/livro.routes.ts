import { Router } from "express";
import { LivroController } from "../controller/LivroController";

const router = Router();
const livroController = new LivroController();

router.post('/', (req, res, next) => {
    livroController.cadastrar(req, res, next);
});

router.get('/', (req, res, next) => {
    livroController.listar(req, res, next);
})

router.get('/:isbn', (req, res, next) => {
    livroController.buscar(req, res, next);
});

router.put('/:isbn', (req, res, next) => {
    livroController.atualizar(req, res, next);
});

router.delete('/:isbn', (req, res, next) => {
    livroController.remover(req, res, next);
});
export default router;