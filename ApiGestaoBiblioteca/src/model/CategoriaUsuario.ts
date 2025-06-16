export class CategoriaUsuario{
    id: number;
    nome: string;

    constructor(nome: string){
        nome = nome.toLowerCase();
        this.verificarCategoria(nome);
        this.id = this.definirId(nome);
        this.nome = nome;
    }

    definirId(nome: string): number{
        if(nome === 'professor'){
            return 1;
        }
        else if(nome === 'aluno'){
            return 2;
        }
        else{
            return 3;
        }
    }

    verificarCategoria(nome: string): void{
        if(nome !== 'professor' && nome !== 'aluno' && nome !== 'bibliotecário'){
            throw new Error(`Categoria de Usuário '${nome}' não é permitida. Certifique que a categoria do usuário seja uma dessas opções: 'professor', 'aluno' e 'bibliotecário' esse último com acento agudo no 'a'`);
        }
    }
};