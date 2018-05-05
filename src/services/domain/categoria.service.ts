import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
//import { Observable } from "rxjs/Observable"; esta importação do "Observable" feita automaticamente pelo Visual Studio dá problema qdo precisa usar outras coisas deste pacote, então deve-se fazer o import abaixo, do Rx
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService {

    constructor(public param_httpClient: HttpClient) {
    }

    // o ":" indica o tipo de retorno da requisição feito pelo método, só que esta é uma requisição assincrona, feita pelo AJAX,
    // então é necessário "se inscrever" para receber a resposta. O Angular encapsula a inscrição para receber a resposta através do um 
    // objeto chamado "Observable"
    metodoService_findAllCategoria() : Observable<CategoriaDTO[]> {
        // igual chamada GET do Postman para pesquisar categorias no backend
        // a crase aqui no Ionic permite concatenar variáveis com string sem usar o operador '+', como no java
        // a var "API_CONFIG" foi definida no arq. "api.config.ts" na pasta "config"
        return this.param_httpClient.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}