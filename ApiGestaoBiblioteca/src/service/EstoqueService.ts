import { Estoque } from "../model/Estoque";
import { Livro } from "../model/Livro";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService{
    repositorioEstoque = EstoqueRepository.getInstance();
    repositorioLivro = LivroRepository.getInstance();

    cadastrarEstoque(id: number, livro_id: string): { sucesso: boolean, mensagem: string, estoque?: Estoque } {
        try {
            const estoque = this.repositorioEstoque.salvar(id, livro_id);
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

    buscarCodigo(livro_id: string): Livro{
        return this.repositorioEstoque.buscarCodigo(livro_id);
    }

    atualizarDisponibilidade(livro_id: string, disponibilidade: boolean): { sucesso: boolean, mensagem: string, exemplares?: Estoque[] } {
        try {
            const exemplares = this.repositorioEstoque.atualizar(livro_id, disponibilidade);
            return {
                sucesso: true,
                mensagem: "Disponibilidade atualizada com sucesso",
                exemplares
            };
        } catch (error) {
            return {
                sucesso: false,
                mensagem: (error as Error).message
            };
        }
    }

    removerCodigo(id: number): boolean {
        return this.repositorioEstoque.remover(id);
    }
}