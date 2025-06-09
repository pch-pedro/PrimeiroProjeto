import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository{
    emprestimos: Emprestimo[] = [];
    proximoId = 1;

    salvar(emprestimo: Omit<Emprestimo, 'id'>): Emprestimo {
        const novoEmprestimo = new Emprestimo(
            this.proximoId++,
            emprestimo.usuario_id,
            emprestimo.estoque_id,
            emprestimo.data_emprestimo,
            emprestimo.data_devolucao,
            emprestimo.data_entrega,
            emprestimo.dias_atraso,
            emprestimo.suspensao_ate
        );
        this.emprestimos.push(novoEmprestimo);
        return novoEmprestimo;
    }

    listar(): Emprestimo[] {
        return this.emprestimos;
    }

    buscarId(id: number): Emprestimo {
        for (let i = 0; i < this.emprestimos.length; i++) {
            const emprestimoAtual = this.emprestimos[i];
            if (emprestimoAtual.id === id) {
                return emprestimoAtual;
            }
        }
        throw new Error(`Empréstimo com ID ${id} não encontrado.`);
    }

    atualizar(id: number, dados: Partial<Omit<Emprestimo, 'id'>>): boolean {
        const emprestimo = this.buscarId(id);
        if (!emprestimo) return false;
        Object.assign(emprestimo, dados);
        return true;
    }

    remover(id: number): boolean {
        const index = this.emprestimos.findIndex(emprestimo => emprestimo.id === id);
        if (index < 0) return false;
        this.emprestimos.splice(index, 1);
        return true;
    }
}