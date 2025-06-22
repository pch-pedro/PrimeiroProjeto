import { Usuario } from "../model/Usuario";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { Curso } from "../model/Curso";

export class UsuarioRepository{
    private static instance: UsuarioRepository;

    private usuarios:Usuario[] = [];

    private constructor(){
        this.usuarios = [];
    }

    static getInstance(): UsuarioRepository{
        if(!UsuarioRepository.instance){
            UsuarioRepository.instance = new UsuarioRepository();
        }
        return UsuarioRepository.instance;
    }

    salvar(usuario: Usuario): void{
        this.usuarios.push(usuario);
    }

    listar(nome?: string, categoria?: string, curso?:string, status?:string): Usuario[]{
        let usuariosFiltrados: Usuario[] = []

        for(let i: number = 0; i < this.usuarios.length; i++){
            usuariosFiltrados.push(this.usuarios[i]);
        }
        
        if(nome){
            let nomeFiltrado: Usuario [] = [];
            for(let i: number = 0; i < usuariosFiltrados.length; i++){
                if(usuariosFiltrados[i].nome.toLowerCase().includes(nome.toLowerCase())){
                    nomeFiltrado.push(usuariosFiltrados[i]);
                }
            }
            usuariosFiltrados = nomeFiltrado;
        }
        if(categoria){
            let categoriaUsuario: CategoriaUsuario = new CategoriaUsuario(categoria);
            let categoriaId1: number = categoriaUsuario.id;
            let categoriaFiltrada: Usuario [] = [];
            for(let i: number = 0; i < usuariosFiltrados.length; i++){
                if(usuariosFiltrados[i].categoriaId.id === categoriaId1){
                    categoriaFiltrada.push(usuariosFiltrados[i]);
                }
            }
            usuariosFiltrados = categoriaFiltrada;
        }

        if(curso){
            let cursoUsuario: Curso = new Curso(curso);
            let cursoId1: number = cursoUsuario.id;
            let cursoFiltrado: Usuario [] = [];
            for(let i: number = 0; i < usuariosFiltrados.length; i++){
                if(usuariosFiltrados[i].cursoId.id === cursoId1){
                    cursoFiltrado.push(usuariosFiltrados[i]);
                }
            }
            usuariosFiltrados = cursoFiltrado;
        }

        if(status){
            let statusFiltrado: Usuario [] = [];
            for(let i: number = 0; i < usuariosFiltrados.length; i++){
                if(usuariosFiltrados[i].status === status.toLowerCase()){
                    statusFiltrado.push(usuariosFiltrados[i]);
                }
            }
            usuariosFiltrados = statusFiltrado;
        }
        
        return usuariosFiltrados;
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
            if(this.usuarios[i].cpf === cpf){
                return this.usuarios[i];
            }
        }
        throw new Error(`Usuário com o cpf ${cpf} não encontrado no sistema. Verifique e tente novamente.`);
    }

    buscarId(id: number): Usuario {
        for (let i: number = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].id === id) {
                return this.usuarios[i];
            }
        }
        throw new Error(`Usuário com ID ${id} não encontrado no sistema. Verifique e tente novamente.`);
    }

    atualizarCpf(cpf: string, nome?: string, categoria?: string, curso?: string): boolean{
        let indexUsuario: number = -1;
        try{
            for(let i: number = 0; i < this.usuarios.length; i++){
                if(this.usuarios[i].cpf === cpf){
                    indexUsuario = i;
                }
            }

            if(indexUsuario === -1){
                throw new Error(`Usuário com o cpf '${cpf}' não encontrado. Verifique e tente novamente.`);
            }

            if(nome === undefined && categoria === undefined && curso === undefined){
                throw new Error("Nenhum parametro de atualização foi passado. Verifique e tente novamente.");
            }

            if(nome){
                this.usuarios[indexUsuario].nome = nome;
            }
            if(categoria){
                let categoriaUsuario: CategoriaUsuario = new CategoriaUsuario(categoria);
                let categoriaId1: number = categoriaUsuario.id;
                this.usuarios[indexUsuario].categoriaId.id = categoriaId1;
            }
            if(curso){
                let cursoUsuario: Curso = new Curso(curso);
                let cursoId1: number = cursoUsuario.id;
                this.usuarios[indexUsuario].cursoId.id = cursoId1;
            }
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