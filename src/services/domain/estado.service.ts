import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EstadoService {

    constructor(public param_httpClient: HttpClient) {
    }

    metodoService_findAllEstado() : Observable<EstadoDTO[]> {
        return this.param_httpClient.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}