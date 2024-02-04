import getAllTransactions from "@/api/getAllTransactions";
import postDrinkTransactions from "@/api/postDrinkTransaction";
import type DrinkTransactionDTO from "@/interfaces/DrinkTransactionDTO";
import { reactive } from "vue";
import { useDrinks } from "./drinkStore";
import type { DrinkType } from "@/enums/DrinkType";

export interface DrinksData {
    [username: string]: DataPoints
}

interface DataPoints {
    [date: string]: {
        'BEER':  DrinkDataDTO,
        'WINE': DrinkDataDTO,
        'LONGDRINK': DrinkDataDTO,
        'LIQUEUR': DrinkDataDTO,
        'LIQUOR': DrinkDataDTO
    }
}

interface DrinkDataDTO {
    volume: number
}

interface IDrinkTransactionState {
    drinksData: DrinksData,
    isLoading: boolean
}

const { drinksState, getAllDrinks, getDrinkById } = useDrinks();

const DrinkTransactionsState = reactive<IDrinkTransactionState>({
    drinksData: {},
    isLoading: false
});

export function useDrinkTransactions() {

    async function getAllDrinkTransactions() {
        DrinkTransactionsState.isLoading = true;
        const transactions = await getAllTransactions();
        // const transactions = TransactionsMock;
        if (drinksState.value.length === 0) {
            await getAllDrinks();
        }
        if (transactions) {
            DrinkTransactionsState.drinksData = getDrinkTransactionsFromTransactions(transactions);
        } else {
            console.log('Error on getting all transactions');
        }
        DrinkTransactionsState.isLoading = false;
    }

    async function addDrinkTransactions(transactions: DrinkTransactionDTO[]) {
        return await postDrinkTransactions(transactions);
    }

    function getDrinkTransactionsFromTransactions(drinkTransactions: DrinkTransactionDTO[]) {
        const output: DrinksData = {};
        drinkTransactions.forEach(drinkTransactionDTO => {
            if (!(drinkTransactionDTO.username in output)) {
                output[drinkTransactionDTO.username] = {};
            }

            const dataVal = getDataValFromTransaction(drinkTransactionDTO);

            
            if (dataVal) {
                setUpDataPoint(output, dataVal.type, dataVal.volume, drinkTransactionDTO.timestamp, drinkTransactionDTO.username);
                output[drinkTransactionDTO.username][drinkTransactionDTO.timestamp][dataVal.type].volume += dataVal.volume;
            }
        });

        return output;
    }

    function getDataValFromTransaction(drinkTransaction: DrinkTransactionDTO) {
        const drink = getDrinkById(drinkTransaction.drink_id);
        if (drink) {
            return {
                type: drink.drinkType,
                volume: drink.volume * drinkTransaction.count
            }
        }
    }

    function setUpDataPoint(drinksData: DrinksData, type: DrinkType, volume: number, timestamp: string, username: string) {
        if (!(timestamp in drinksData[username])) {
            drinksData[username][timestamp] = {
                'BEER':  { volume: 0 },
                'WINE': { volume: 0 },
                'LONGDRINK': { volume: 0 },
                'LIQUEUR': { volume: 0 },
                'LIQUOR':{ volume: 0 }
            }
        }
    }

    return {
        DrinkTransactionsState,
        getAllDrinkTransactions,
        addDrinkTransactions
    }
}