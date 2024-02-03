import type DrinkTransactionDTO from "@/interfaces/DrinkTransactionDTO";
import useApi from "./api";
import { useLogin } from "@/stores/loginStore";

export default async function postDrinkTransactions(transactions: DrinkTransactionDTO[]) {
    const { authState } = useLogin();

    return await useApi<boolean>(
        '/api/drink/transactions/all',
        'POST',
        JSON.stringify(transactions),
        'application/json',
        authState.token
    );
}