import getDrinks from "@/api/getDrinks";
import postDrink from "@/api/postDrink";
import type DrinkDTO from "@/interfaces/DrinkDTO";
import { reactive, readonly, ref } from "vue";

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

export function useDrinks() {

    return {
        drinksState: readonly(drinksState),
        getAllDrinks,
        createDrink
    }
}