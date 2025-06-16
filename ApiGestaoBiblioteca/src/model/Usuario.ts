import { CategoriaUsuario } from "./CategoriaUsuario";
import { Curso } from "./Curso";

export class Usuario{
    id: number;
    nome: string;
    cpf: string;
    categoriaId: CategoriaUsuario;
    cursoId: Curso;
    status: string;

    constructor(id: number, nome: string, cpf: string, categoriaId: CategoriaUsuario, cursoId: Curso, status: string){
        this.id = id
        this.nome = nome;
        this.cpf = cpf;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
        this.status = status;
    }
}