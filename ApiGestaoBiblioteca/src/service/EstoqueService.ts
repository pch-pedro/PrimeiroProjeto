import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService{
    repositorioEstoque = new EstoqueRepository();
    repositorioLivro = LivroRepository.getInstance();

    cadastrarEstoque(id: number, livro_id: string): { sucesso: boolean, mensagem: string, estoque?: Estoque } {
        try {
            const estoque = this.repositorioEstoque.salvar(livro_id);
            return {
                sucesso: true,
                mensagem: "Estoque cadastrado com sucesso",
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

    buscarCodigo(id: number): Estoque{
        return this.repositorioEstoque.buscarCodigo(id);
    }

    atualizarCodigo(id: number, dados: Partial<Omit<Estoque, 'id'>>): boolean {
        return this.repositorioEstoque.atualizarCodigo(id, dados);
    }

    removerCodigo(id: number): boolean {
        return this.repositorioEstoque.remover(id);
    }
}