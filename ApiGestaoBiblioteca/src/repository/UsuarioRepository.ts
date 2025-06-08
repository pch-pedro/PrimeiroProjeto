import { Usuario } from "../model/Usuario";

export class UsuarioRepository{
    usuarios:Usuario[] = [];

    constructor(){
        this.usuarios = [];
    }

    salvar(usuario: Usuario): void{
        try{
            const cpfRepetido = this.buscarCpf(usuario.cpf);
            console.log("Já existe um usuário com este CPF. Verifique e tente novamente");
        }catch (erro){
            this.usuarios.push(usuario);
            console.log("Usuário salvo com sucesso");
        }
    }

    listar(): Usuario[]{
        return this.usuarios;
    }

    compararCpf(usuario: Usuario, cpf: string): boolean{
        if(usuario.cpf === cpf){
            return true;
        }
        else{
            return false;
        }
    }

    buscarCpf(cpf: string): Usuario{
        for(let i: number = 0; i < this.usuarios.length; i++){
            if(this.compararCpf(this.usuarios[i], cpf)){
                return this.usuarios[i];
            }
        }
        throw new Error(`Usuário com o cpf ${cpf} não encontrado no sistema. Verifique e tente novamente.`);
    }

    atualizarCpf(cpf: string, novosDados: Partial<Usuario>): boolean{
        try{
            const usuario = this.buscarCpf(cpf);
            Object.assign(usuario, novosDados);
            return true;
        }catch(error){
            return false;
        }
    }

    removerCpf(cpf: string): boolean{
        try{
            const usuario = this.buscarCpf(cpf);
            const index = this.usuarios.indexOf(usuario);
            if(index != -1){
                this.usuarios.splice(index, 1);
                return true;
            }
            return false;
        }catch (error){
            return false;
        }
    }
}