import { Request } from "express";
import { Response } from "express";
import { Usuario } from "../model/Usuario";
import { UsuarioService }  from "../service/UsuarioService";
import { CategoriaUsuario } from "../model/CategoriaUsuario";

const usuarioService = new UsuarioService();

export class UsuarioController{
    cadastrar(req: Request, res: Response){
        const{id, nome, cpf, categoria, curso, status} = req.body;
        const usuario = new Usuario(id, nome, cpf, categoria, curso, status);
        const resultado = usuarioService.cadastrar(usuario);
        if(resultado.sucesso === true){
            return res.status(201).json(usuario);
        }
        else{
            return res.status(400).json({erro: resultado.mensagem});
        }
    }

    listar (req: Request, res: Response){
        const {cpf} = req.params;
        const usuario = usuarioService.buscarCpf(cpf);
        if(usuario != null){
            return res.json(usuario);
        }
        else{
            return res.status(404).json({erro: "Usuário não encontrado. Verifique os dados e tente novamente"});
        }
    }

    atualizar(req: Request, res: Response){
        const {cpf} = req.params;
        const sucesso = usuarioService.atualizar(cpf, req.body);
        if(sucesso == false){
            return res.status(404).json({erro: "Usuário não encontrado"});
        }
        else{
            return res.json({mensagem: "Usuário atualizado"});
        }
    }

    remover(req: Request, res: Response){
        const {cpf} = req.params;
        const sucesso = usuarioService.remover(cpf);
        if(sucesso == false){
            return res.status(404).json({erro: "Usuário não encontrado"});
        }
        else{
            return res.status(204).send();
        }
    }
}