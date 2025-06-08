import { Livro } from "../model/Livro";

export class LivroRepository{
    livros: Livro [] = [];
    proximoId = 1;

    salvar(livro: {titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoria_id: number}): Livro{
        const novoLivro = new Livro(
            this.proximoId,
            livro.titulo,
            livro.autor,
            livro.editora,
            livro.edicao,
            livro.isbn,
            livro.categoria_id
        );

        this.proximoId++;
        this.livros.push(novoLivro);

        return novoLivro;
    }
}