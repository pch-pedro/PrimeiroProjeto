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
        let cpfValido: boolean = false;
        if(cpf.length === 11){
            tamanhoCpf = true;
            cpfRepetido = this.validarSequencia(cpf);
            primeiroDigitoVerificador = this.verificarPrimeiroDigito(cpf);
            segundoDigitoVerificador = this.verificarSegundoDigito(cpf);
        }
        else{
            throw new Error("O cpf informado não possui 11 digitos. Verifique e tente novamente");
        }
        if(cpfRepetido === true){
            throw new Error("O cpf possui uma sequência de 11 números repetidos. Verifique e tente novamente");
        }
        if(primeiroDigitoVerificador === false){
            throw new Error("O primeiro digito verificador, décimo digito, não é válido. Verifique e tente novamente");
        }
        if(segundoDigitoVerificador === false){
            throw new Error("O segundo dígito verificador, o décimo primeiro dígito, não é válido. Verifique e tente novamente");
        }
        return cpf;
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
        let Digito: number = 0;
        for(let i: number = 0; i < 9; i++){
            soma += parseInt(vetorCpf[i]) * peso--;
        }
        resto = soma % 11;
        if(resto < 2){
            Digito = 0;
            if(parseInt(vetorCpf[9]) === Digito){
                primeiroDigitoVerificador = true;
            }
            return primeiroDigitoVerificador;
        }
        else{
            Digito = 11 - resto;
            if(parseInt(vetorCpf[9]) === Digito){
                primeiroDigitoVerificador = true;
            }
        }
        return primeiroDigitoVerificador;
    }

    verificarSegundoDigito(cpf: string): boolean{
        let segundoDigitoVerificador: boolean = false;
        let soma: number = 0;
        let vetorCpf: string [] = this.transformarCpfVetor(cpf);
        let peso: number = 11;
        let resto: number = 0;
        let Digito: number = 0;
        for(let i: number = 0; i < 10; i++){
            soma += parseInt(vetorCpf[i]) * peso--;
        }
        resto = soma % 11;
        if(resto < 2){
            Digito = 0;
            if(parseInt(vetorCpf[10]) === Digito){
                segundoDigitoVerificador = true;
            }
            return segundoDigitoVerificador;
        }
        else{
            Digito = 11 - resto;
            if(parseInt(vetorCpf[10]) === Digito){
                segundoDigitoVerificador = true;
            }
            return segundoDigitoVerificador;
        }
    }
}