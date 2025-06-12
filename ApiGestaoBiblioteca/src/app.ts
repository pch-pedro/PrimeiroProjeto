import express from 'express';
import usuarioRoutes from './routes/usuario.routes';
import livroRoutes from './routes/livro.routes';
import estoqueRoutes   from './routes/estoque.routes';
import emprestimoRoutes from './routes/emprestimo.routes';

const app = express();
app.use(express.json());

app.use('/library/usuarios', usuarioRoutes);
app.use('/library/livros', livroRoutes);
app.use('/library/estoque', estoqueRoutes);
app.use('/library/emprestimos', emprestimoRoutes);


const PORT = 3090;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
