import { CategoriaUsuario } from "./CategoriaUsuario";
import { Curso } from "./Curso";

export class Usuario{
    id: number;
    nome: string;
    cpf: string;
    categoriaId: CategoriaUsuario;
    cursoId: Curso;
    status: string;

    constructor(nome: string, cpf: string, categoriaId: CategoriaUsuario, cursoId: Curso, status: string){
        this.id = this.criarId();
        this.nome = nome;
        this.cpf = this.validarCpf(cpf);
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
        this.status = status;
    }

    criarId(){
        return Date.now();
    }

    validarCpf(cpf: string): string{
        let tamanhoCpf: boolean = false;
        let cpfRepetido: boolean = false;
        if(cpf.length === 11){
            tamanhoCpf = true;
            cpfRepetido = this.validarSequencia(cpf);
        }
    }

    transformarCpfVetor(cpf: string): string []{
        let vetorCpf: string [] = [];
        for(let i: number = 0; i < cpf.length; i++){
            vetorCpf[i] = cpf.substring(i, i +1);
        }
        return vetorCpf;
    }

    validarSequencia(cpf: string): boolean{
        let repetido: boolean = false;
        let vetorCpf: string [] = this.transformarCpfVetor(cpf);
        let numerosRepetidos: number = 0;
        for(let i: number = 0; i < cpf.length; i++){
            if(vetorCpf[i] === cpf[0]){
                numerosRepetidos++;
            }
        }
        if(numerosRepetidos === 11){
            repetido = true;
        }
        return repetido;
    }
}