import { Request } from "express";
import { Response } from "express";
import { EstoqueService } from "../service/EstoqueService";
import { Estoque } from "../model/Estoque";

const servicoEstoque = new EstoqueService;

export class EstoqueController{
    public cadastrar(req: Request, res: Response) {
    try {
        const { id, livro_id } = req.body;

        const resultado = servicoEstoque.cadastrarEstoque(id, livro_id);

        if (resultado.sucesso) {
            return res.status(201).json(resultado.estoque);
        } else {
            return res.status(400).json({ erro: resultado.mensagem });
        }
    } catch (error) {
        return res.status(500).json({ erro: (error as Error).message });
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