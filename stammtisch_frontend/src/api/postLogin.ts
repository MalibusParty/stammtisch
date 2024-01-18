import type AuthResult from "@/interfaces/AuthResult";
import useApi from "./api";

export default async function postLogin(username: string, password: string) {
    return await useApi<AuthResult>(
        '/api/auth/authenticate',
        'POST',
        JSON.stringify({ username: username, password: password }),
        'application/json'
    );
}