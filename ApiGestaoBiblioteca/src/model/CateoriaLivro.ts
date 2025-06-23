export class CategoriaLivro{
    id: number;
    nome: string;
    
    constructor(nome: string){
        nome = nome.toLowerCase();
        this.verificarCategoria(nome);
        this.id = this.definirId(nome);
        this.nome = nome;
    }

    definirId(nome: string): number{
        if(nome === 'romance'){
            return 1;
        }
        else if(nome === 'computação'){
            return 2;
        }
        else if(nome === 'letras'){
            return 3;
        }
        else{
            return 4;
        }
    }

    verificarCategoria(nome: string): void{
        if(nome !== 'romance' && nome !== 'computação' && nome !== 'letras' && nome !== 'gestão'){
            throw new Error(`Categoria de Livro '${nome}' não é permitida. Certifique que a categoria do usuário seja uma dessas opções: 'romance' 'computação' 'letras' e 'gestão' todos com a acentuação correta`);
        }
    }
};