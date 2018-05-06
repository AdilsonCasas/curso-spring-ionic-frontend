export interface ClienteDTO {
    id : string;
    nome: string;
    email: string;
    imageUrl?: string; // este '?' significa que este attibuto é opcional (não precisa ser preenchido)
}