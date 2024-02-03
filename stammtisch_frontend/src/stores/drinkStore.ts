import getDrinks from "@/api/getDrinks";
import postDrink from "@/api/postDrink";
import type DrinkDTO from "@/interfaces/DrinkDTO";
import { readonly, ref } from "vue";

const drinksState = ref<DrinkDTO[]>([]);

async function getAllDrinks() {
    const drinks = await getDrinks();
    drinksState.value = drinks ?? [];
}

async function createDrink(drink: DrinkDTO) {
    const worked = await postDrink(drink);

    if (worked) {
        await getAllDrinks();
    }
}

function getDrinkById(drinkId: number): DrinkDTO | undefined {
    return drinksState.value.find(drink => drink.drink_id === drinkId);
}

function convertDrinkToName(drink: DrinkDTO | undefined) {
    if (!drink) {
        return 'Unknown Drink';
    }
    const nameMap = {
        'BEER': 'Bier',
        'WINE': 'Wein',
        'LONGDRINK': 'Longdrink',
        'LIQUEUR': 'Likör',
        'LIQUOR': 'Schnapps'
    }

    return `${nameMap[drink.drinkType]} ${drink.volume}ml`;
}

export function useDrinks() {

    return {
        drinksState: readonly(drinksState),
        getAllDrinks,
        createDrink,
        getDrinkById,
        convertDrinkToName
    }
}