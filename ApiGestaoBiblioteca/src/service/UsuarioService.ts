import { Usuario } from "../model/Usuario";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService{
    repositorio = new UsuarioRepository();
}