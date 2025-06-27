import { executarComandoSQL } from "../database/mysql";

export class ProductRepository{
    imprimeResult(err: any, result: any){
        if(result != undefined){
            console.log("Dentro do callback", result);
        }
    }

    createTable(){
        try{
            const resultado = executarComandoSQL("CREATE TABLE Vendas.Product (id INT AUTO_INCREMENT PRYMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL(10, 2) NOT NULL)", [],this.imprimeResult);
            console.log('Query executada com sucesso:', resultado);
        }catch (err){
            console.error('Erro ao executar a query:', err);
        }
    }
}