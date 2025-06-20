import { Estoque } from "../model/Estoque";

export class EstoqueRepository{
    estoque: Estoque [] = [];
    proximoId = 1;

    salvar(estoqueObj: Omit <Estoque, 'id'>): Estoque{
        const novoEstoque: Estoque = {
            id: this.proximoId,
            livro_id: estoqueObj.livro_id,
            quantidade: estoqueObj.quantidade,
            quantidade_emprestada: estoqueObj.quantidade_emprestada,
            disponivel: estoqueObj.disponivel
        };
        this.proximoId++;
        this.estoque.push(novoEstoque);
        return novoEstoque;
    }

    listar(): Estoque[]{
        return this.estoque;
    }

    atualizar(id: number, novosDados: Partial<Omit<Estoque, 'id'>>): boolean {
        for (let i = 0; i < this.estoque.length; i++) {
            if (this.estoque[i].id === id) {
                const estoqueAtual = this.estoque[i];
                if (novosDados.livro_id !== undefined) {
                    estoqueAtual.livro_id = novosDados.livro_id;
                }
                if (novosDados.quantidade !== undefined) {
                    estoqueAtual.quantidade = novosDados.quantidade;
                }
                if (novosDados.quantidade_emprestada !== undefined) {
                    estoqueAtual.quantidade_emprestada = novosDados.quantidade_emprestada;
                }
                if (novosDados.disponivel !== undefined) {
                    estoqueAtual.disponivel = novosDados.disponivel;
                }
                return true;
            }
        }
        return false;
    }

    buscarCodigo(id: number): Estoque {
        for (let i: number = 0; i < this.estoque.length; i++) {
            if (this.estoque[i].id === id) {
                return this.estoque[i];
            }
        }
        throw new Error(`Estoque com ID ${id} não encontrado.`);
    }

    buscarPorId(id: number): Estoque {
        for (let i = 0; i < this.estoque.length; i++) {
            if (this.estoque[i].id === id) {
                return this.estoque[i];
            }
        }
        throw new Error(`Estoque com ID ${id} não encontrado. Verifique e tente novamente.`);
    }

    atualizarCodigo(id: number, estoque: Partial<Omit<Estoque, 'id'>>): boolean{
        const estoqueExistente = this.buscarCodigo(id);
        if (estoqueExistente === undefined) {
            return false;
        }
        if (estoque.livro_id !== undefined) {
            estoqueExistente.livro_id = estoque.livro_id;
        }
        if (estoque.quantidade !== undefined) {
            estoqueExistente.quantidade = estoque.quantidade;
        }
        if (estoque.quantidade_emprestada !== undefined) {
            estoqueExistente.quantidade_emprestada = estoque.quantidade_emprestada;
        }
        if (estoque.disponivel !== undefined) {
            estoqueExistente.disponivel = estoque.disponivel;
        }
        return true;
    }

    remover(id: number): boolean{
        for (let i: number = 0; i < this.estoque.length; i++) {
            if (this.estoque[i].id === id) {
                this.estoque.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}