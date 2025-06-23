import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService{
    repositorioEstoque = EstoqueRepository.getInstance();
    repositorioLivro = LivroRepository.getInstance();

    cadastrarEstoque(id: number, livro_id: string): { sucesso: boolean, mensagem: string, estoque?: Estoque } {
        try {
            const estoque = this.repositorioEstoque.salvar(livro_id);
            return {
                sucesso: true,
                mensagem: "Exemplar cadastrado com sucesso",
                estoque
            };
        } catch (error) {
            return {
                sucesso: false,
                mensagem: (error as Error).message
            };
        }
    }

    listar(): Estoque[]{
        return this.repositorioEstoque.listar();
    }

    buscarCodigo(livro_id: string): Estoque{
        return this.repositorioEstoque.buscarCodigo(livro_id);
    }

    atualizarCodigo(livro_id: string): boolean {
        return this.repositorioEstoque.atualizarCodigo(livro_id);
    }

    removerCodigo(id: number): boolean {
        return this.repositorioEstoque.remover(id);
    }
}