import useApi from "@/api/api";
import type UserNameMapDTO from "@/interfaces/UserNameMapDTO";
import { useLogin } from "@/stores/loginStore";

export default async function getUsers() {
    const { authState } = useLogin();

    return await useApi<UserNameMapDTO[]>(
        '/api/users',
        'GET',
        undefined,
        null,
        authState.token
    );
}