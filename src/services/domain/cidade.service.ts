import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CidadeService {

    constructor(public param_httpClient: HttpClient) {
    }

    metodoService_findAllCidade(param_estadoId: string) : Observable<CidadeDTO[]> {
        return this.param_httpClient.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${param_estadoId}/cidades`);
    }
}