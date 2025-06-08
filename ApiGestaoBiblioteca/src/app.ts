import express from 'express';
import usuarioRoutes from './routes/usuario.routes';

const app = express();
app.use(express.json());

app.use('/library/usuarios', usuarioRoutes);

const PORT = 3090;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
