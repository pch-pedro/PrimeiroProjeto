export class Emprestimo {
  id: number;
  usuario_id: number;
  estoque_id: number;
  data_emprestimo: Date;
  data_devolucao: Date | null;
  data_entrega: Date | null;
  dias_atraso: number;
  suspensao_ate: Date | null;

  constructor(id: number, usuario_id: number, estoque_id: number, data_emprestimo: Date, data_devolucao: Date | null = null, data_entrega: Date | null = null, dias_atraso: number = 0, suspensao_ate: Date | null = null){
    this.id = id;
    this.usuario_id = usuario_id;
    this.estoque_id = estoque_id;
    this.data_emprestimo = data_emprestimo;
    this.data_devolucao = data_devolucao;
    this.data_entrega = data_entrega;
    this.dias_atraso = dias_atraso;
    this.suspensao_ate = suspensao_ate;
  }
}