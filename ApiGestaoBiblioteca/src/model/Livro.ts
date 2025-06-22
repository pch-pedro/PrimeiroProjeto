import { CategoriaLivro } from "./CateoriaLivro";

export class Livro{
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    isbn: string;
    categoria_id: CategoriaLivro;

    constructor(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoria_id: string){
        this.id = this.criarId();
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.isbn = isbn;
        this.categoria_id = new CategoriaLivro(categoria_id);
    }

    criarId(){
        return Date.now();
    }
}