export type CategoriaUsuario = 'professor' | 'aluno' | 'bibliotecario';

export type StatusUsuario = 'ativo' | 'inativo' | 'suspenso';

export class Usuario{
    nome: string;
    cpf: string;
    email: string;
    categoria: CategoriaUsuario;
    curso: string;
    status: StatusUsuario;

    constructor(nome: string, cpf: string, email: string, categoria: CategoriaUsuario, curso: string, status: StatusUsuario){
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.categoria = categoria;
        this.curso = curso;
        this.status = status;
    }
}