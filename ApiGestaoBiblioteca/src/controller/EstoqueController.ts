import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { EstoqueService } from "../service/EstoqueService";

const servicoEstoque = new EstoqueService;

export class EstoqueController{
    public cadastrar(req: Request, res: Response) {
    try {
        const { livro_id, quantidade } = req.body;
        const resultado = servicoEstoque.cadastrarEstoque({
            livro_id,
            quantidade,
            quantidade_emprestada: 0,
            disponivel: quantidade > 0
        });
        if (resultado.sucesso) {
            return res.status(201).json(resultado.estoque);
        } else {
            return res.status(400).json({ erro: resultado.mensagem });
        }
    } catch (error) {
        return res.status(500).json({ erro: "Erro no servidor" });
    }
}

    public listar(req: Request, res: Response) {
        try {
            const estoques = servicoEstoque.listar();
            return res.json(estoques);
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public buscar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const estoque = servicoEstoque.buscarCodigo(Number(id));
            return res.json(estoque);
        } catch (error) {
            return res.status(404).json({ erro: "Estoque não encontrado" });
        }
    }

    public atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const sucesso = servicoEstoque.atualizarCodigo(Number(id), req.body);
            if (sucesso) {
                return res.json({ mensagem: "Estoque atualizado com sucesso" });
            } else {
                return res.status(404).json({ erro: "Estoque não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public remover(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const sucesso = servicoEstoque.removerCodigo(Number(id));
            if (sucesso) {
                return res.status(204).send();
            } else {
                return res.status(404).json({ erro: "Estoque não encontrado" });
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }
}