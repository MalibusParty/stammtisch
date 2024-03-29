import postLogin from "@/api/postLogin";
import postRegister from "@/api/postRegister";
import { Role } from "@/enums/Role";
import type AuthResult from "@/interfaces/AuthResult";
import { reactive, readonly } from "vue";

interface AuthState {
    firstname: string,
    lastname: string,
    username: string,
    token: string,
    role: Role,
    loggedIn: boolean
}

const authState = reactive<AuthState>({
    firstname: '',
    lastname: '',
    username: '',
    token: '',
    role: Role.USER,
    loggedIn: false
});

let session = sessionStorage.getItem('stammtisch');

async function login(username: string, password: string) {
    const response = await postLogin(username, password);

    if (response !== undefined) {
        authState.firstname = response.firstname;
        authState.lastname = response.lastname;
        authState.username = response.username;
        authState.token = response.token;
        authState.role = response.role;
        authState.loggedIn = true;
        sessionStorage.setItem('stammtisch', JSON.stringify(response));
        session = sessionStorage.getItem('stammtisch');
    }
}

async function register(firstname: string, lastname: string, username: string, password: string) {
    return await postRegister(firstname, lastname, username, password);
}

function logout() {
    authState.loggedIn = false;
    authState.firstname = '';
    authState.lastname = '';
    authState.username = '';
    authState.token = '';
    authState.role = Role.USER;
    sessionStorage.clear();
    session = null;
}

export function useLogin() {

    if (session !== null) {
        const authResult: AuthResult = JSON.parse(session);
        authState.firstname = authResult.firstname;
        authState.lastname = authResult.lastname;
        authState.username = authResult.username;
        authState.token = authResult.token;
        authState.role = authResult.role;
        authState.loggedIn = authResult.token !== '';
    }

    return {
        authState: readonly(authState),
        login,
        register,
        logout
    }
}