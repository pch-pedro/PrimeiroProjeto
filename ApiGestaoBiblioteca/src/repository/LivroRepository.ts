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

    listar(): Livro[] {
        return this.livros;
    }

    buscarIsbn(isbn: string): Livro{
        for(let i: number = 0; i < this.livros.length; i++){
            const livro = this.livros[i];
            if(livro.isbn === isbn){
                return livro;
            }
        }
        throw new Error(`Livro com o ISBN ${isbn} não encontrado. Verifique os dados e tente novamente`);
    }

    atualizarIsbn(isbn: string, dados: Partial<Omit<Livro, 'id'>>): void{
        const livro = this.buscarIsbn(isbn);
        Object.assign(livro, dados);
    }

    removerIsbn(isbn: string): void{
        let index = -1;
        for(let i: number = 0; i < this.livros.length; i++){
            if(this.livros[i].isbn === isbn){
                index = i;
                break;
            }
        }
        if(index < 0){
            throw new Error(`Livro com o ISBN ${isbn} não encontrado`);
        }
        this.livros.splice(index, 1);
    }
}