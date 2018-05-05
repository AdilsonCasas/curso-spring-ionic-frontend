import { Injectable } from "@angular/core";
import { localUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class Storage_keysService {

    getLocalUser(): localUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser); // "localStorage" é um local dentro do browser que armazena valores no formato "chave-valor ", ex: ("x","10"), define uma var chamada "x" com o valor "10", sempre como string
        if(usr == null) { // não existe a chave "STORAGE_KEYS.localUser" no localStorage (esta STORAGE_KEY está definida no arq "storage_key.config.ts")
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: localUser) { // recebe o obj "localUser" e armazena ele no "localtorage"
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}