import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";

export class EmprestimoService{
    repositorioEmprestimo = new EmprestimoRepository();
    repositorioUsuario = new UsuarioRepository();
    repositorioEstoque = new EstoqueRepository();

    cadastrar(emprestimo: Omit<Emprestimo, 'id' | 'data_devolucao' | 'data_entrega' | 'dias_atraso' | 'suspensao_ate'>): { sucesso: boolean; mensagem: string; emprestimo?: Emprestimo } {
        const usuario = this.repositorioUsuario.buscarId(emprestimo.usuario_id);
        if (usuario == null || usuario.status !== 'ativo') {
            return { sucesso: false, mensagem: 'Usuário inválido ou inativo' };
        }
        const estoque = this.repositorioEstoque.buscarPorId(emprestimo.estoque_id);
        if (estoque == null || estoque.disponivel == false) {
            return { sucesso: false, mensagem: 'Exemplar indisponível' };
        }

        const dataEmp = new Date();
        const prazo = new Date();
        prazo.setDate(dataEmp.getDate() + 15);

        const novoEmprestimo: Omit<Emprestimo, 'id'> = {
            usuario_id: emprestimo.usuario_id,
            estoque_id: emprestimo.estoque_id,
            data_emprestimo: dataEmp,
            data_devolucao: null,
            data_entrega: null,
            dias_atraso: 0,
            suspensao_ate: null
        };

        estoque.disponivel = false;
        estoque.quantidade_emprestada += 1;
        this.repositorioEstoque.atualizar(estoque.id, estoque);

        const emprestimoSalvo = this.repositorioEmprestimo.salvar(novoEmprestimo);
        return { sucesso: true, mensagem: 'Empréstimo registrado', emprestimo: emprestimoSalvo };
    }
}