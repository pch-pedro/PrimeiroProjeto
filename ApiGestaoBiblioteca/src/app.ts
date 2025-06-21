import express, {Request, Response} from 'express';
import usuarioRoutes from './routes/usuario.routes';
import livroRoutes from './routes/livro.routes';
import estoqueRoutes   from './routes/estoque.routes';
import emprestimoRoutes from './routes/emprestimo.routes';
import { UsuarioController } from './controller/UsuarioController';

const app = express();
const PORT = process.env.PORT ?? 3090;
app.use(express.json());

app.use('/library/usuarios',);
app.use('/library/livros', livroRoutes);
app.use('/library/estoque', estoqueRoutes);
app.use('/library/emprestimos', emprestimoRoutes);




app.listen(PORT, () => console.log(`API em execução no URL: http://localhost:${PORT}`));
