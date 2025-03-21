import { Buffer } from "buffer";

// Função para transformar ID real em um ID público
export function encodeId(id: string) {
    return Buffer.from(id).toString("base64url");
}

// Função para decodificar de volta
export function decodeId(encodedId: string) {
    return Buffer.from(encodedId, "base64url").toString();
}
