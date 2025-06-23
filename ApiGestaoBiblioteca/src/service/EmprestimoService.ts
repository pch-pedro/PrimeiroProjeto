import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";

export class EmprestimoService{
    repositorioEmprestimo = new EmprestimoRepository();
    repositorioUsuario = UsuarioRepository.getInstance();
    repositorioEstoque = EstoqueRepository.getInstance();

    listar(): Emprestimo[] {
        return this.repositorioEmprestimo.listar();
    }

    cadastrar(dados: { usuario_id: number, estoque_id: number }): { sucesso: boolean; mensagem: string; emprestimo?: Emprestimo } {
        const usuario = this.repositorioUsuario.buscarId(dados.usuario_id);
        if (!usuario || usuario.status !== 'ativo') {
            return { sucesso: false, mensagem: 'Usuário inválido ou inativo' };
        }

        const estoque = this.repositorioEstoque.buscarPorId(dados.estoque_id);
            if (!estoque || estoque.disponivel === false) {
            return { sucesso: false, mensagem: 'Exemplar indisponível' };
        }

        estoque.emprestar();
        this.repositorioEstoque.atualizarPorId(estoque.id, estoque);

        const novoEmprestimo: Emprestimo = {
            id: 0,
            usuario_id: dados.usuario_id,
            estoque_id: dados.estoque_id,
            data_emprestimo: new Date(),
            data_devolucao: null,
            data_entrega: null,
            dias_atraso: 0,
            suspensao_ate: null
        };

        const emprestimoSalvo = this.repositorioEmprestimo.salvar(novoEmprestimo);

        return {
            sucesso: true,
            mensagem: 'Empréstimo registrado',
            emprestimo: emprestimoSalvo
        };
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
            estoque.devolver();
            this.repositorioEstoque.atualizarPorId(estoque.id, estoque);
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