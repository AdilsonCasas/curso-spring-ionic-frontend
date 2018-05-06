import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { Storage_keysService } from "../storage_keys.service";

@Injectable()
export class ClienteService {

    constructor(
                public param_http: HttpClient,
                public param_storage_keyService: Storage_keysService) {
    }

    findByEmal(param_email: string) : Observable<ClienteDTO> {

        let var_token = this.param_storage_keyService.getLocalUser().token;
        let var_authHeader = new HttpHeaders({"Authorization": "Bearer " + var_token });

	// a chamada do "postman" para um GET neste endpoint deve ser: 'localhost:8080/clientes/email?param_email=pp890645@gmail.com'
    return this.param_http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?param_email=${param_email}`,
                {"headers": var_authHeader});
    }

    getImageFromBucket(param_id: string): Observable<any> {
        let var_Url = `${API_CONFIG.bucketBaseUrl}/ClientProfile${param_id}.jpg`
                    return this.param_http.get(var_Url, {responseType : 'blob'});
    }
}