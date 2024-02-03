import type DrinkTransactionDTO from "@/interfaces/DrinkTransactionDTO";
import useApi from "./api";
import { useLogin } from "@/stores/loginStore";

export default async function getAllDrinkTransactions() {
    const { authState } = useLogin();

    return await useApi<DrinkTransactionDTO[]>(
        '/api/drink/transactions/all',
        'GET',
        undefined,
        null,
        authState.token
    );
}