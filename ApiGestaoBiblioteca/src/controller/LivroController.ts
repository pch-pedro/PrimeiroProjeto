import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { LivroService } from "../service/LivroService";

const livroService = new LivroService();

export class LivroController{
    public cadastrar(req: Request, res: Response, next: NextFunction){
        try{
            const {titulo, autor, editora, edicao, isbn, categoria_id} = req.body;

            const resultado = livroService.cadastrar({
                titulo,
                autor,
                editora,
                edicao,
                isbn,
                categoria_id
            });

            if(resultado.sucesso){
                return res.status(201).json(resultado.livro);
            }
            else{
                return res.status(400).json({erro: resultado.mensagem});
            }
        }catch (error){
            return res.status(500).json({erro: "Erro no servidor"});
        }
    }

    public listar(req: Request, res: Response, next: NextFunction) {
        try {
            const livros = livroService.listar();
            return res.json(livros);
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public buscar(req: Request, res: Response, next: NextFunction) {
        try {
            const { isbn } = req.params;
            const livro = livroService.buscarIsbn(isbn);
            if (livro) {
                return res.json(livro);
            } else {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public atualizar(req: Request, res: Response, next: NextFunction) {
        try {
            const { isbn } = req.params;
            const sucesso = livroService.atualizar(isbn, req.body);
            if (sucesso) {
                return res.json({ mensagem: "Livro atualizado com sucesso" });
            } else {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public remover(req: Request, res: Response, next: NextFunction) {
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