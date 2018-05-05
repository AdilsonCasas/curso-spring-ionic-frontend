import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {
    }

    authenticate(var_creds: CredenciaisDTO) {


        console.log(`${API_CONFIG.baseUrl}/login`, var_creds);


        return this.http.post( // este método vai enviar um POST" para o nosso backend com 3 argumentos
                        `${API_CONFIG.baseUrl}/login`, // primeiro argumento: o endpoint
                        var_creds, // segundo argumento: os valores de login+senha
                        { // terceiro argumento:
                            observe: "response", // isto é para pegar o header da resposta do backend
                            responseType: "text" // um text e não um JSon, porque a resposta de um login no backend volta um "body" vazio
                                                 // então isso é definido como um text para que o framework não tente fazer um parse na resposta
                                                 // se o framework fizer um parse na resposta vai gerar um erro
                        });
     }

}