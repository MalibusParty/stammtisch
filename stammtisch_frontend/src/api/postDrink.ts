import useApi from "@/api/api";
import type DrinkDTO from "@/interfaces/DrinkDTO";
import { useLogin } from "@/stores/loginStore";

export default async function postDrinks(drink: DrinkDTO) {
    const { authState } = useLogin();

    return await useApi<boolean>(
        '/api/drink',
        'POST',
        JSON.stringify(drink),
        'application/json',
        authState.token
    );
}