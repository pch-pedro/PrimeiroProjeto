export class Curso{
    id: number;
    nome: string;

    constructor(nome: string){
        nome = nome.toLowerCase();
        this.verificarCurso(nome);
        this.id = this.definirId(nome);
        this.nome = nome;
    }

    definirId(nome: string): number{
        if(nome === 'ads'){
            return 1;
        }
        else if(nome === 'pedagogia'){
            return 2;
        }
        else{
            return 3;
        }
    }

    verificarCurso(nome: string): void{
        if(nome !== 'ads' && nome !== 'pedagogia' && nome !== 'administração'){
            throw new Error(`Curso: '${nome}' não está disponível por enquanto. Certifique que o usuário seja de um desses cursos: ads, pedagogia e administração esse último com as acentuações corretas`);
        }
    }
}