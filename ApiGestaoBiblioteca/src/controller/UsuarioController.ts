import { Request, Response } from "express";
import { Usuario } from "../model/Usuario";
import { UsuarioService } from "../service/UsuarioService";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { Curso } from "../model/Curso";

const usuarioService = UsuarioService.getInstance();

export class UsuarioController {
    public cadastrar(req: Request, res: Response) {
        try {
            const {nome, cpf, categoria, curso} = req.body;
            const usuario = new Usuario(nome, cpf, categoria, curso, 'ativo');
            const resultado = usuarioService.cadastrar(usuario);
            if (resultado.sucesso) {
                return res.status(201).json(resultado.usuario);
            } else {
                return res.status(400).json({ erro: resultado.mensagem });
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public listar(req: Request, res: Response) {
        try {
            const usuarios = usuarioService.listar();
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public buscarPorCpf(req: Request, res: Response) {
        try {
            const { cpf } = req.params;
            const usuario = usuarioService.buscarCpf(cpf);
            return res.json(usuario);
        } catch (error) {
            return res.status(404).json({erro: (error as Error).message});
        }
    }

    public atualizar(req: Request, res: Response) {
        try {
            const { cpf } = req.params;
            const sucesso = usuarioService.atualizar(cpf, req.body);
            if (!sucesso) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            } else {
                return res.json({ mensagem: "Usuário atualizado" });
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public remover(req: Request, res: Response) {
        try {
            const { cpf } = req.params;
            const sucesso = usuarioService.remover(cpf);
            if (!sucesso) {
                return res.status(404).json({ erro: "Usuário não encontrado" });
            } else {
                return res.status(204).send();
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }
}
