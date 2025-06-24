import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EmprestimoService } from "../service/EmprestimoService";

export class Emprestimo {
  id: number;
  usuario_id: string;
  estoque_id: number;
  data_emprestimo: Date;
  data_devolucao: Date | null;
  data_entrega: Date | null;
  dias_atraso: number;
  suspensao_ate: Date | null;

  constructor(usuario_id: string, estoque_id: number){
    this.id = this.criarId();
    this.usuario_id = usuario_id;
    this.estoque_id = estoque_id;
    this.data_emprestimo = new Date;
    this.data_devolucao = this.calcularDevolucao(this.data_emprestimo, usuario_id);
    this.data_entrega = null;
    this.dias_atraso = 0;
    this.suspensao_ate = null;
  }

  static repositorioUsuario = UsuarioRepository.getInstance();
  
  criarId(){
    return Date.now();
  }

  calcularDevolucao(data: Date, usuario_id: string): Date {
    let prazoDias: number;
    const usuario = Emprestimo.repositorioUsuario.buscarCpf(usuario_id);
    const categoria = usuario.categoriaId.nome.toLowerCase();
    if (categoria === "professor") {
      prazoDias = 40;
    } else {
      prazoDias = 15;
    }
    const dataDevolucao = new Date(data);
    dataDevolucao.setDate(dataDevolucao.getDate() + prazoDias);
    return dataDevolucao;
  }
}