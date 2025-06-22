import { Router, Request, Response} from 'express';
import { UsuarioController } from '../controller/UsuarioController';

const router = Router();
const usuarioController = new UsuarioController();

router.post('/', (req: Request, res: Response) => {
  usuarioController.cadastrar(req, res);
});

router.get('/', (req: Request, res: Response) => {
  usuarioController.listar(req, res); 
});

router.get('/:cpf', (req: Request, res: Response) => {
  usuarioController.buscarPorCpf(req, res);
});

router.put('/:cpf', (req: Request, res: Response) => {
  usuarioController.atualizar(req, res);
});

router.delete('/:cpf', (req: Request, res: Response) => {
  usuarioController.remover(req, res);
});

export default router;
