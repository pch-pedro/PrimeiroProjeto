import { CategoriaUsuario } from "./CategoriaUsuario";
import { Curso } from "./Curso";

export type StatusUsuario = 'ativo' | 'inativo' | 'suspenso';

export class Usuario{
    id: number;
    nome: string;
    cpf: string;
    categoria: CategoriaUsuario;
    curso: Curso;
    status: StatusUsuario;

    constructor(id: number, nome: string, cpf: string, categoria: CategoriaUsuario, curso: Curso, status: StatusUsuario){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.categoria = categoria;
        this.curso = curso;
        this.status = status;
    }
}