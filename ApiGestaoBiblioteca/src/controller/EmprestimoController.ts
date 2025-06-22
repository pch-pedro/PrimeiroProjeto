import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { EmprestimoService } from "../service/EmprestimoService";

const servicoEmprestimo = new EmprestimoService();

export class EmprestimoController {
    public cadastrar(req: Request, res: Response): void {
        try {
            const { usuario_id, estoque_id } = req.body;
            if (usuario_id == null || estoque_id == null) {
                res.status(400).json({ erro: "usuario_id e estoque_id são obrigatórios." });
                return;
            }
            const resultado = servicoEmprestimo.cadastrar({ 
                usuario_id: Number(usuario_id), 
                estoque_id: Number(estoque_id),
                data_emprestimo: new Date()
            });
            if (resultado.sucesso) {
                res.status(201).json(resultado.emprestimo);
            } else {
                res.status(400).json({ erro: resultado.mensagem });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public listar(req: Request, res: Response): void {
        try {
            const listaEmprestimos = servicoEmprestimo.listar();
            res.json(listaEmprestimos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public devolver(req: Request, res: Response): void {
        try {
            const id = Number(req.params.id);
            const resultado = servicoEmprestimo.devolverId(id);
            
            if (resultado.sucesso) {
                res.json({ mensagem: resultado.mensagem, emprestimo: resultado.emprestimo });
            } else {
                res.status(400).json({ erro: resultado.mensagem });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro no servidor" });
        }
    }
}