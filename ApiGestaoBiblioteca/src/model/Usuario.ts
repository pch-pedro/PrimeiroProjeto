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
        let primeiroDigitoVerificador: boolean = false;
        let segundoDigitoVerificador: boolean = false;
        if(cpf.length === 11){
            tamanhoCpf = true;
            cpfRepetido = this.validarSequencia(cpf);
            primeiroDigitoVerificador = this.verificarPrimeiroDigito(cpf);
            segundoDigitoVerificador = this.verificarSegundoDigito(cpf);
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

    verificarPrimeiroDigito(cpf: string): boolean{
        let primeiroDigitoVerificador: boolean = false;
        let soma: number = 0;
        let vetorCpf: string [] = this.transformarCpfVetor(cpf);
        let peso: number = 10;
        let resto: number = 0;
        for(let i: number = 0; i < 9; i++){
            soma += parseInt(vetorCpf[i]) * peso--;
        }
        resto = soma%11;
        if(resto < 2){
            soma = 0;
            if(parseInt(vetorCpf[9]) === soma){
                primeiroDigitoVerificador = true;
            }
            return primeiroDigitoVerificador;
        }
        else{
            soma = 11 - resto;
            if(parseInt(vetorCpf[9]) === soma){
                primeiroDigitoVerificador = true;
            }
        }
        return primeiroDigitoVerificador;
    }

    verificarSegundoDigito
}