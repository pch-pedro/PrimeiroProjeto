import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService{
    repositorioLivro = LivroRepository.getInstance();

    private static instance: LivroService;

    static getInstance(): LivroService{
        if(!LivroService.instance){
            LivroService.instance = new LivroService();
        }
        return LivroService.instance;
    }

    cadastrar(livro: Livro): { sucesso: boolean, mensagem: string, livro?: Livro } {
        try {
            this.repositorioLivro.salvar(livro);
            return {
                sucesso: true,
                mensagem: "Livro cadastrado com sucesso",
                livro
            };
        } catch (error) {
            return {
                sucesso: false,
                mensagem: (error as Error).message
            };
        }
    }

    listar(): Livro []{
        return this.repositorioLivro.listar();
    }

    buscarIsbn(isbn: string): Livro{
        try{
            return this.repositorioLivro.buscarIsbn(isbn);
        }catch(erro){
            throw new Error((erro as Error).message);
        }
    }

    atualizar(isbn: string, titulo?: string, autor?: string, editora?: string, categoria_id?: string): { sucesso: boolean, mensagem: string } {
        try {
            this.repositorioLivro.atualizarIsbn(isbn, titulo, autor, editora, categoria_id);
            return {
                sucesso: true,
                mensagem: "Livro atualizado com sucesso"
            };
        } catch (error) {
            return {
                sucesso: false,
                mensagem: (error as Error).message
            };
        }
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