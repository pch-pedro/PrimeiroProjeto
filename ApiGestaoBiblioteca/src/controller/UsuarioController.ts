import { Request, Response, NextFunction } from "express";
import { Usuario } from "../model/Usuario";
import { UsuarioService } from "../service/UsuarioService";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { Curso } from "../model/Curso";

const usuarioService = new UsuarioService();

export class UsuarioController {
    public cadastrar(req: Request, res: Response, next: NextFunction) {
        try {
            const {nome, cpf, categoria, curso, status } = req.body;
            const categoriaObj = new CategoriaUsuario(categoria.nome);
            const cursoObj = new Curso(curso.nome);
            const usuario = new Usuario(nome, cpf, categoriaObj, cursoObj, 'ativo');
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

    public listar(req: Request, res: Response, next: NextFunction) {
        try {
            const usuarios = usuarioService.listar(); // Chama o método listar
            return res.json(usuarios);
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public buscarPorCpf(req: Request, res: Response, next: NextFunction) {
        try {
            const { cpf } = req.params;
            const usuario = usuarioService.buscarCpf(cpf);
            if (usuario) {
                return res.json(usuario);
            } else {
                return res.status(404).json({ erro: "Usuário não encontrado. Verifique os dados e tente novamente" });
            }
        } catch (error) {
            return res.status(500).json({ erro: "Erro no servidor" });
        }
    }

    public atualizar(req: Request, res: Response, next: NextFunction) {
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
