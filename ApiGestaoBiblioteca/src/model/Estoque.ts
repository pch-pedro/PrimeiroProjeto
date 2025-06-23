export class Estoque {
  id: number;
  livro_id: string;
  quantidade: number;
  quantidade_emprestada: number;
  disponivel: boolean;

  constructor(id: number, livro_id: string){
    this.id = id;
    this.livro_id = livro_id;
    this.quantidade = 1;
    this.quantidade_emprestada = 0;
    this.disponivel = true;
  }

  emprestar(): void{
    if(this.quantidade_emprestada >= this.quantidade){
      throw new Error("Não há exemplar disponível para empréstimo");
    }
    this.quantidade_emprestada++;
    this.disponibilidade();
  }

  devolver(): void{
    if(this.quantidade_emprestada <= 0){
      throw new Error("Não há exemplares emprestados");
    }
    this.quantidade_emprestada--;
    this.disponibilidade();
  }

  disponibilidade(): void{
    if(this.quantidade_emprestada < this.quantidade){
      this.disponivel = true;
    }
    else{
      this.disponivel = false;
    }
  }
}