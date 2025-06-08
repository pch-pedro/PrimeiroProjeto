import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService{
    repositorioEstoque = new EstoqueRepository();
    repositorioLivro = new LivroRepository();

    cadastrarEstoque(estoqueObjeto: Omit<Estoque, 'id'>): { sucesso: boolean; mensagem: string; estoque?: Estoque } {
        try {
            this.repositorioLivro.buscarId(estoqueObjeto.livro_id);
        } catch (erro) {
            return {
                sucesso: false,
                mensagem: "Livro não existe no sistema. Por favor, verifique o identificador informado."
            };
        }
        
        const novoEstoque: Omit<Estoque, 'id'> = {
            livro_id: estoqueObjeto.livro_id,
            quantidade: estoqueObjeto.quantidade,
            quantidade_emprestada: 0,
            disponivel: estoqueObjeto.quantidade > 0
        };
        
        const estoqueSalvo: Estoque = this.repositorioEstoque.salvar(novoEstoque);
        return {
            sucesso: true,
            mensagem: "Estoque cadastrado com sucesso.",
            estoque: estoqueSalvo
        };
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