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
}