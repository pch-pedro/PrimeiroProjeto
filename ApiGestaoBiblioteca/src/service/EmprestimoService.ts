import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";

export class EmprestimoService{
    repositorioEmprestimo = new EmprestimoRepository();
    repositorioUsuario = new UsuarioRepository();
    repositorioEstoque = new EstoqueRepository();

    listar(): Emprestimo[] {
        return this.repositorioEmprestimo.listar();
    }

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

    devolverId(id: number): { sucesso: boolean; mensagem: string; emprestimo?: Emprestimo } {
        const emprestimo = this.repositorioEmprestimo.buscarId(id);
        
        if (!emprestimo) {
            return { sucesso: false, mensagem: 'Empréstimo não encontrado' };
        }
        
        const dataDevolucao = new Date();
        emprestimo.data_devolucao = dataDevolucao;

        const diasAtraso = this.calcularDiasAtraso(emprestimo.data_emprestimo, dataDevolucao);
        emprestimo.dias_atraso = diasAtraso;
 
        const estoque = this.repositorioEstoque.buscarPorId(emprestimo.estoque_id);
        if (estoque) {
            estoque.disponivel = true;
            estoque.quantidade_emprestada -= 1;
            this.repositorioEstoque.atualizar(estoque.id, estoque);
        }

        this.repositorioEmprestimo.atualizar(emprestimo.id, emprestimo);
        return { sucesso: true, mensagem: 'Devolução registrada com sucesso', emprestimo };
    }

    calcularDiasAtraso(dataEmprestimo: Date, dataDevolucao: Date): number {
        const prazoDevolucao = new Date(dataEmprestimo);
        prazoDevolucao.setDate(prazoDevolucao.getDate() + 15);
        const diferencaTempo = dataDevolucao.getTime() - prazoDevolucao.getTime();
        const diasAtraso = Math.ceil(diferencaTempo / (1000 * 3600 * 24));
        return diasAtraso > 0 ? diasAtraso : 0;
    }

}