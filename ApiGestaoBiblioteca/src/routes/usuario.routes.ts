import { Router, Request, Response, NextFunction } from 'express';
import { UsuarioController } from '../controller/UsuarioController';

const router = Router();
const usuarioController = new UsuarioController();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  usuarioController.cadastrar(req, res, next);
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  usuarioController.listar(req, res, next); 
});

router.get('/:cpf', (req: Request, res: Response, next: NextFunction) => {
  usuarioController.buscarPorCpf(req, res, next);
});

router.put('/:cpf', (req: Request, res: Response, next: NextFunction) => {
  usuarioController.atualizar(req, res, next);
});

router.delete('/:cpf', (req: Request, res: Response, next: NextFunction) => {
  usuarioController.remover(req, res);
});

export default router;
