import { Estoque } from "../model/Estoque";
import { Livro } from "../model/Livro";
import { LivroRepository } from "./LivroRepository";

export class EstoqueRepository{
    private static instance: EstoqueRepository;

    private estoque:Estoque[] = [];

    private livroRepository = LivroRepository.getInstance();

    private constructor(){
        this.estoque = [];
    }

    static getInstance(): EstoqueRepository{
        if(!EstoqueRepository.instance){
            EstoqueRepository.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }

    

    salvar(id: number, livro_id: string): Estoque {
        const novoEstoque = new Estoque(id, livro_id);
        this.estoque.push(novoEstoque);
        return novoEstoque;
    }

    listar(): Estoque[]{
        let estoqueDisponibilidade: Estoque [] = [];
        for(let i: number = 0; i < this.estoque.length; i++){
            if(this.estoque[i].disponivel === true){
                estoqueDisponibilidade.push(this.estoque[i]);
            }
        }
        return estoqueDisponibilidade;
    }

    buscarCodigo(livro_id: string): Livro {
        let noEstoque: boolean = false;
        for (let i: number = 0; i < this.estoque.length; i++) {
            if (this.estoque[i].livro_id === livro_id) {
                noEstoque = true;
            }
        }
        if(noEstoque === false){
            throw new Error(`Exemplar com o ISBN '${livro_id}' não encontrado.`);
        }
        return this.livroRepository.buscarIsbn(livro_id);
    }

    atualizar(livro_id: string, disponibilidade: boolean): Estoque[] {
        let exemplares: Estoque [] = [];
        for(let i: number = 0; i < this.estoque.length; i++){
            if(this.estoque[i].livro_id === livro_id){
                this.estoque[i].disponivel = disponibilidade;
                exemplares.push(this.estoque[i]);
            }
        }
        if(exemplares.length === 0){
            throw new Error(`Nenhum exemplar com o ISBN '${livro_id}' encontrado. Verifique, e tente novamente.`);
        }
        return exemplares;
    }

    buscarPorId(id: number): Estoque {
        for (let i = 0; i < this.estoque.length; i++) {
            if (this.estoque[i].id === id) {
                return this.estoque[i];
            }
        }
        throw new Error(`Exemplar com ID '${id}' não encontrado.`);
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
    atualizarPorId(id: number, estoqueAtualizado: Estoque): Estoque {
        for (let i = 0; i < this.estoque.length; i++) {
            if (this.estoque[i].id === id) {
                this.estoque[i] = estoqueAtualizado;
                return this.estoque[i];
            }
        }
        throw new Error(`Exemplar com ID '${id}' não encontrado para atualização.`);
    }
}