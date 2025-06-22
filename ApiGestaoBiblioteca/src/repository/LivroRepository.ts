import { Livro } from "../model/Livro";
import { CategoriaLivro } from "../model/CateoriaLivro";

export class LivroRepository{
    private static instance: LivroRepository;

    private livros: Livro[] = [];

    private constructor(){
        this.livros = [];
    }

    static getInstance(): LivroRepository{
        if(!LivroRepository.instance){
            LivroRepository.instance = new LivroRepository();
        }
        return LivroRepository.instance;
    }

    salvar(livro: Livro): Livro{
        if(this.compararIsbn(livro) === false){
            this.livros.push(livro);
        }
        else{
            throw new Error(`Livro com o ISBN '${livro.isbn}' já está cadastrado no sistema. Verifique e tente novamente'`)
        }
        return livro;
    }

    compararIsbn(livro: Livro): boolean{
        for(let i: number = 0; i < this.livros.length; i++){
            if(livro.isbn === this.livros[i].isbn){
                return true;
            }
        }
        return false;
    }

    listar(titulo?: string, autor?: string, editora?: string, categoria_id?: string): Livro[]{
        let livrosFiltrados: Livro [] = []

        for(let i: number = 0; i < this.livros.length; i++){
            livrosFiltrados.push(this.livros[i]);
        }
        
        if(titulo){
            let tituloFiltrado: Livro [] = [];
            for(let i: number = 0; i < livrosFiltrados.length; i++){
                if(livrosFiltrados[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
                    tituloFiltrado.push(livrosFiltrados[i]);
                }
            }
            livrosFiltrados = tituloFiltrado;
        }
        if (autor) {
            let autorFiltrado: Livro[] = [];
            for (let i: number = 0; i < livrosFiltrados.length; i++) {
                if (livrosFiltrados[i].autor.toLowerCase().includes(autor.toLowerCase())) {
                    autorFiltrado.push(livrosFiltrados[i]);
                }
            }
            livrosFiltrados = autorFiltrado;
        }

        if (editora) {
            let editoraFiltrada: Livro[] = [];
            for (let i: number = 0; i < livrosFiltrados.length; i++) {
                if (livrosFiltrados[i].editora.toLowerCase().includes(editora.toLowerCase())) {
                    editoraFiltrada.push(livrosFiltrados[i]);
                }
            }
            livrosFiltrados = editoraFiltrada;
        }

        if (categoria_id) {
            let categoriaFiltrada: Livro[] = [];
            for (let i: number = 0; i < livrosFiltrados.length; i++) {
                if (livrosFiltrados[i].categoria_id.nome.toLowerCase() === categoria_id.toLowerCase()) {
                    categoriaFiltrada.push(livrosFiltrados[i]);
                }
            }
            livrosFiltrados = categoriaFiltrada;
        }
        
        return livrosFiltrados;
    }

    buscarIsbn(isbn: string): Livro{
        for(let i: number = 0; i < this.livros.length; i++){
            if(this.livros[i].isbn === isbn){
                return this.livros[i];
            }
        }
        throw new Error(`Livro com o ISBN ${isbn} não encontrado. Verifique os dados e tente novamente`);
    }

    buscarId(id: number): Livro {
        for (let i: number = 0; i < this.livros.length; i++) {
            if(this.livros[i].id === id){
                return this.livros[i];
            }
        }
        throw new Error(`Livro com o ID ${id} não encontrado. Verifique os dados e tente novamente.`);
    }   

    atualizarIsbn(isbn: string, titulo?: string, autor?: string, editora?: string, categoria_id?: string): void{
        let indexLivro: number = -1;
        for (let i: number = 0; i < this.livros.length; i++) {
            if (this.livros[i].isbn === isbn) {
                indexLivro = i;
            }
        }

        if (indexLivro === -1) {
            throw new Error(`Livro com o ISBN '${isbn}' não encontrado. Verifique e tente novamente.`);
        }

        if (titulo === undefined && autor === undefined && editora === undefined && categoria_id === undefined) {
            throw new Error("Nenhum parâmetro de atualização foi passado. Verifique e tente novamente.");
        }

        if (titulo) {
            this.livros[indexLivro].titulo = titulo;
        }

        if (autor) {
            this.livros[indexLivro].autor = autor;
        }
        
        if (editora) {
            this.livros[indexLivro].editora = editora;
        }

        if (categoria_id) {
            let novaCategoria: CategoriaLivro = new CategoriaLivro(categoria_id);
            this.livros[indexLivro].categoria_id = novaCategoria;
        }
    }

    removerIsbn(isbn: string): void{
        let index = -1;
        for(let i: number = 0; i < this.livros.length; i++){
            if(this.livros[i].isbn === isbn){
                index = i;
                break;
            }
        }
        if(index < 0){
            throw new Error(`Livro com o ISBN ${isbn} não encontrado`);
        }
        this.livros.splice(index, 1);
    }
}