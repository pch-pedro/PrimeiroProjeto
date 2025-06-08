import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    repositorioLivro = new LivroRepository();

    cadastrar(livro: {
        titulo: string, 
        autor: string, 
        editora: string, 
        edicao: string, 
        isbn: string, 
        categoria_id: number
    }): {sucesso: boolean; mensagem: string; livro?: Livro}{
        const listaLivros = this.repositorioLivro.listar();

        let isbnExiste = false;
        for (let i: number = 0; i < listaLivros.length; i++){
            if(listaLivros[i].isbn === livro.isbn){
                isbnExiste = true;
                break;
            }
        }

        if(isbnExiste === true){
            return{
                sucesso: false,
                mensagem: "Já esxiste um livro com esse ISBN no sistema."
            };
        }

        const novoLivro = this.repositorioLivro.salvar(livro);

        return{
            sucesso: true,
            mensagem: "Livro cadastrado com sucesso",
            livro: novoLivro
        };
    }

    listar(): Livro []{
        return this.repositorioLivro.listar();
    }

    buscarIsbn(isbn: string): Livro{
        try{
            const livro = this.repositorioLivro.buscarIsbn(isbn);
            return livro;
        }catch(error){
            throw new Error (`Livro com o ISBN ${isbn} não encontrado`);
        }
    }

    atualizar(isbn: string, dados: Partial<Omit<Livro, 'id'>>): boolean {
        const livroExistente = this.repositorioLivro.buscarIsbn(isbn);
        if (livroExistente === null) {
            return false;
        }
        this.repositorioLivro.atualizarIsbn(isbn, dados);
        return true;
    }

    remover(isbn: string): boolean {
        const livroExistente = this.repositorioLivro.buscarIsbn(isbn);
        if (livroExistente === null) {
            return false;
        }
        this.repositorioLivro.removerIsbn(isbn);
        return true;
    }
}