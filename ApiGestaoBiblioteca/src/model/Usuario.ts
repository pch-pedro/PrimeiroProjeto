import { CategoriaUsuario } from "./CategoriaUsuario";
import { Curso } from "./Curso";

export class Usuario{
    id: number;
    nome: string;
    cpf: string;
    categoriaId: CategoriaUsuario;
    cursoId: Curso;
    status: string;

    constructor(nome: string, cpf: string, categoriaId: CategoriaUsuario, cursoId: Curso, status: string){
        this.id = this.criarId();
        this.nome = nome;
        this.cpf = cpf;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
        this.status = status;
    }

    criarId(){
        return Date.now();
    }
}