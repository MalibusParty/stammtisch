import getAllTransactions from "@/api/getAllTransactions";
import postDrinkTransactions from "@/api/postDrinkTransaction";
import type DrinkTransactionDTO from "@/interfaces/DrinkTransactionDTO";
import { ref } from "vue";

const DrinkTransactionsState = ref<DrinkTransactionDTO[]>([]);

export function useDrinkTransactions() {

    async function getAllDrinkTransactions() {
        const transactions = await getAllTransactions();
        if (transactions) {
            DrinkTransactionsState.value = transactions;
        } else {
            console.log('Error on getting all transactions');
        }
    }

    async function addDrinkTransactions(transactions: DrinkTransactionDTO[]) {
        return await postDrinkTransactions(transactions);
    }

    return {
        DrinkTransactionsState,
        getAllDrinkTransactions,
        addDrinkTransactions
    }
}