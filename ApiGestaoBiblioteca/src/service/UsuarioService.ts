import { Usuario } from "../model/Usuario";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService{
    repositorio = new UsuarioRepository();

    proximoId = 1;

    cpfValido(cpf: string): boolean{
        if(cpf.length !== 11){
            return false;
        }

        for(let i: number = 0; i < cpf.length; i++){
            const caractere = cpf[i];
            if(caractere < '0' || caractere > '9'){
                return false;
            }
        }

        const primeiroDigito = cpf[0];
        let todosIguais = true;
        for(let i: number = 1; i < cpf.length; i++){
            if(cpf[i] !== primeiroDigito){
                todosIguais = false;
                break;
            }
        }

        if(todosIguais == true){
            return false;
        }

        return true;
    }

    cadastrar(usuario: Usuario): {sucesso: boolean, mensagem: string, usuario?: Usuario}{
        const cpfValido = this.cpfValido(usuario.cpf);

        if(cpfValido == false){
            return{
                sucesso: false,
                mensagem: "O CPF informado é inválido. Verifique, e tente novamente"
            };
        }

        try{
            this.repositorio.buscarCpf(usuario.cpf);
            return{
                sucesso: false,
                mensagem: "CPF já cadastrado"
            };
        }catch (error){
            try{
                usuario.id = this.proximoId++;
                this.repositorio.salvar(usuario);
                return{
                    sucesso: true,
                    mensagem: "Usuário cadastrado com sucesso",
                    usuario
                };
            }catch (error){
                return{
                    sucesso: false,
                    mensagem: "Erro ao cadastrar usuário. Verifique os dados e tente novamente"
                };
            }
        }
    }

    listar(): Usuario[]{
        return this.repositorio.listar();
    }

    buscarCpf(cpf: string): Usuario{
        return this.repositorio.buscarCpf(cpf);
    }

    atualizar(cpf: string, dados: Partial<Usuario>): boolean{
        return this.repositorio.atualizarCpf(cpf, dados);
    }

    remover(cpf: string): boolean{
        return this.repositorio.removerCpf(cpf);
    }
}