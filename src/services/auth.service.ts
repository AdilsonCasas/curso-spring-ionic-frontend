import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { localUser } from "../models/local_user";
import { Storage_keysService } from "./storage_keys.service";

@Injectable()
export class AuthService {

    constructor(public var_http: HttpClient, public var_storage_keyService: Storage_keysService ) {
    }

    authenticate(var_creds: CredenciaisDTO) {


        console.log(`${API_CONFIG.baseUrl}/login`, var_creds);


        return this.var_http.post( // este método vai enviar um POST" para o nosso backend com 3 argumentos
                        `${API_CONFIG.baseUrl}/login`, // primeiro argumento: o endpoint
                        var_creds, // segundo argumento: os valores de login+senha
                        { // terceiro argumento:
                            observe: "response", // isto é para pegar o header da resposta do backend
                            responseType: "text" // um text e não um JSon, porque a resposta de um login no backend volta um "body" vazio
                                                 // então isso é definido como um text para que o framework não tente fazer um parse na resposta
                                                 // se o framework fizer um parse na resposta vai gerar um erro
                        });
     }

     succesfulLogin(authorizationValue : string) {
         let var_token = authorizationValue.substring(7); // pega uma substring do token sem o "Bearer " do início
         let var_usr: localUser = {
             token: var_token
         };
         this.var_storage_keyService.setLocalUser(var_usr);
     }

     logout() {
        this.var_storage_keyService.setLocalUser(null);
    }

}