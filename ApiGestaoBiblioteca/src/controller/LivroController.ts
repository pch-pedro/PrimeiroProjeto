import { Request } from "express";
import { Response } from "express";
import { LivroService } from "../service/LivroService";
import { Livro } from "../model/Livro";

const livroService = LivroService.getInstance();

export class LivroController{
    public cadastrar(req: Request, res: Response) {
        try {
            const { titulo, autor, editora, edicao, isbn, categoria_id } = req.body;
            const livro = new Livro(titulo, autor, editora, edicao, isbn, categoria_id);
            const resultado = livroService.cadastrar(livro);

            if (resultado.sucesso) {
                return res.status(201).json(resultado.livro);
            } else {
                return res.status(400).json({ erro: resultado.mensagem });
            }
        } catch (error) {
            return res.status(400).json({ erro: (error as Error).message });
        }
    }

    public listar(req: Request, res: Response) {
        try {
            const livros = livroService.listar();
            return res.json(livros);
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public buscarPorIsbn(req: Request, res: Response) {
        try {
            const { isbn } = req.params;
            const livro = livroService.buscarIsbn(isbn);
            return res.json(livro);
        } catch (error) {
            return res.status(404).json({ erro: (error as Error).message });
        }
    }

    public atualizar(req: Request, res: Response) {
        try {
            const { isbn } = req.params;
            const { titulo, autor, editora, categoria_id } = req.body;

            const resultado = livroService.atualizar(isbn, titulo, autor, editora, categoria_id);

            if (!resultado.sucesso) {
                return res.status(400).json({ erro: resultado.mensagem });
            } 

            return res.json({ mensagem: resultado.mensagem });
        } catch (error) {
            return res.status(400).json({ erro: (error as Error).message });
        }
    }

    public remover(req: Request, res: Response) {
        try {
            const { isbn } = req.params;
            const sucesso = livroService.remover(isbn);
            if (sucesso) {
                return res.status(204).send();
            } else {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }
}