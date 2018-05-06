import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { localUser } from "../models/local_user";
import { Storage_keysService } from "./storage_keys.service";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

    attr_jwtHelper: JwtHelper = new JwtHelper(); 

    constructor(public param_http: HttpClient, public param_storage_keyService: Storage_keysService ) {
    }

    authenticate(param_CredenciaisDTO: CredenciaisDTO) {

        return this.param_http.post( // este método vai enviar um POST" para o nosso backend com 3 argumentos
                        `${API_CONFIG.baseUrl}/login`, // primeiro argumento: o endpoint
                        param_CredenciaisDTO, // segundo argumento: os valores de login+senha
                        { // terceiro argumento:
                            observe: "response", // isto é para pegar o header da resposta do backend
                            responseType: "text" // um text e não um JSon, porque a resposta de um login no backend volta um "body" vazio
                                                 // então isso é definido como um text para que o framework não tente fazer um parse na resposta
                                                 // se o framework fizer um parse na resposta vai gerar um erro
                        });
     }

     succesfulLogin(param_authorizationValue : string) {
         let var_token = param_authorizationValue.substring(7); // pega uma substring do token sem o "Bearer " do início
         let var_usr: localUser = {
             token: var_token,
             email: this.attr_jwtHelper.decodeToken(var_token).sub // este ".sub" pega o email de dentro do token
         };
         this.param_storage_keyService.setLocalUser(var_usr);
     }

     logout() {
        this.param_storage_keyService.setLocalUser(null);
    }

}