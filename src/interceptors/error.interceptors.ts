import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(var_req: HttpRequest<any>, var_next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("passou");
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

                    return Observable.throw(var_errorObj);
                }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};