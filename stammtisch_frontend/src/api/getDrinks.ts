import useApi from "@/api/api";
import type DrinkDTO from "@/interfaces/DrinkDTO";
import { useLogin } from "@/stores/loginStore";

export default async function getDrinks() {
    const { authState } = useLogin();

    return await useApi<DrinkDTO[]>(
        '/api/drink',
        'GET',
        undefined,
        null,
        authState.token
    );
}