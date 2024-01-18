import useApi from "./api";

export default async function postRegister(firstname: string, lastname: string, username: string, password: string) {
    return await useApi<boolean>(
        '/api/auth/register',
        'POST',
        JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: password
        }),
        'application/json'
    );
}