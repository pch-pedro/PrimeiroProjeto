import { UsuarioRepository } from "../repository/UsuarioRepository";

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
    this.data_devolucao = calcularDevolucao(this.data_emprestimo, usuario_id);
    this.data_entrega = null;
    this.dias_atraso = calcularAtraso(this.data_emprestimo, this.data_devolucao);
    this.suspensao_ate = null;
  }

  static repositorioUsuario = UsuarioRepository.getInstance();
  
  criarId(){
    return Date.now();
  }
}