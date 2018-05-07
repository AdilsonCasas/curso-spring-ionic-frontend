import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Storage_keysService } from "../services/storage_keys.service";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public param_storage_keyService: Storage_keysService) {
    }

    intercept(var_req: HttpRequest<any>, var_next: HttpHandler): Observable<HttpEvent<any>> {

        let var_localUser = this.param_storage_keyService.getLocalUser();

        // este 'intercept' irá interceptar requisições feitas tanto para o meu backend em Spring como tb para o S3 da amazon.com
        let var_lenUrl = API_CONFIG.baseUrl.length;
        let var_requestToMinhaAPI = var_req.url.substring(0, var_lenUrl) == API_CONFIG.baseUrl;

        if(var_localUser && var_requestToMinhaAPI) { // se var_localUser não é null && a requisição sendo inspecionada for para a minha API (meu backend escrito no Spring)
            // o comando abaixo "clona" a requisição http e lhe acrescenta o 'Authorization' e o token.
            // esta clonagem é explicada no site do Angular: https://angular.io/guide/http
            const authReq = var_req.clone({headers: var_req.headers.set('Authorization', 'Bearer ' + var_localUser.token)})
            return var_next.handle(authReq);
        }
        else { // se 'var_localUser' for null retorna a própria requisição original
            return var_next.handle(var_req);
        }

    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};