import { Usuario } from "../model/Usuario";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService{
    repositorio = UsuarioRepository.getInstance();

    private static instance: UsuarioService;

    static getInstance(): UsuarioService{
        if(!UsuarioService.instance){
            UsuarioService.instance = new UsuarioService();
        }
        return UsuarioService.instance;
    }

    cadastrar(usuario: Usuario): {sucesso: boolean, mensagem: string, usuario?: Usuario}{
        try{
            this.repositorio.salvar(usuario);
            return{
                sucesso: true,
                mensagem: "Usuário cadastrado com sucesso",
                usuario
            };
        }catch (error){
            return{
                sucesso: false,
                mensagem: (error as Error).message
            };
        }
    }

    listar(): Usuario[]{
        return this.repositorio.listar();
    }

    buscarCpf(cpf: string): Usuario{
        return this.repositorio.buscarCpf(cpf);
    }

    atualizar(cpf: string, nome?: string, categoria?: string, curso?: string): boolean{
        return this.repositorio.atualizarCpf(cpf, nome, categoria, curso);
    }

    remover(cpf: string): boolean{
        return this.repositorio.removerCpf(cpf);
    }
}