import { Router } from "express";
import { LivroController } from "../controller/LivroController";

const router = Router();
const livroController = new LivroController();

router.post('/', (req, res) => {
    livroController.cadastrar(req, res);
});

router.get('/', (req, res) => {
    livroController.listar(req, res);
})

router.get('/:isbn', (req, res) => {
    livroController.buscar(req, res);
});

router.put('/:isbn', (req, res) => {
    livroController.atualizar(req, res);
});

router.delete('/:isbn', (req, res) => {
    livroController.remover(req, res);
});
export default router;