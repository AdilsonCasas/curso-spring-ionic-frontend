import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Storage_keysService } from "../services/storage_keys.service";
import { AlertController, Alert } from "ionic-angular";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public param_storage_keyService: Storage_keysService, public param_alertController: AlertController) {
    }

    // este 'interceptor' intercepta erros HTTP que retornem do backend, como um HTTP.FORBIDEN por exemplo
    intercept(var_req: HttpRequest<any>, var_next: HttpHandler): Observable<HttpEvent<any>> {
        return var_next.handle(var_req)
                .catch((error, caught) => {

                    let var_errorObj = error;
                    if(var_errorObj.error) { // se tiver o campo "error" seta só este obj "error" para o obj
                        var_errorObj = var_errorObj.error;
                    }
                    if(!var_errorObj.status) { // se não existe o campo "status" então o erro não veio no formato JSon
                        var_errorObj = JSON.parse(var_errorObj); // transforma em JSon
                    }

                    console.log("Erro interceptado pelo interceptor:");
                    console.log(var_errorObj);

                    switch(var_errorObj.status) {
                        case 401: // erro de Autenticação
                            this.handle_erro_401();
                        break;

                        case 403:
                            this.handle_erro_403();
                        break;

                        default:
                            this.handle_erro_default(var_errorObj);
                        break;
                    }

                    // este comando 'return' abaixo "propaga" o erro interceptado de volta ao controler que foi interrompido por este interceptor
                    // fazendo com que o processo continue, da mesma forma que o 'chain' faz isso no Spring
                    return Observable.throw(var_errorObj);
                }) as any;
    }

    handle_erro_401() {
        let var_alertController = this.param_alertController.create({
            title: "Erro 401: falha de autenticação",
            message: "email ou senha incorretos",
            enableBackdropDismiss: false, // pra sair do Alert tem que apertar no botão do Alert e não em outro qualquer
            buttons: [
                {text: "OK"}
            ]
        });
        var_alertController.present();
    }

    handle_erro_403() { // minha função para tratamento do erro HttpStatus_403
        // em um erro tipo FORBIDEN, algum possível 'localUser' que esteja armazenado no 'Stogare' deve ser gerado
        this.param_storage_keyService.setLocalUser(null);
    }

    handle_erro_default(var_errorObj) {
        let var_alertController = this.param_alertController.create({
            title: "Erro " + var_errorObj.status + ": " + var_errorObj.error,
            message: var_errorObj.message,
            enableBackdropDismiss: false, // pra sair do Alert tem que apertar no botão do Alert e não em outro qualquer
            buttons: [
                {text: "OK"}
            ]
        });
        var_alertController.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};