import getDrinks from "@/api/getDrinks";
import postDrink from "@/api/postDrink";
import type DrinkDTO from "@/interfaces/DrinkDTO";
import { reactive, readonly, ref } from "vue";

const drinksState = ref<DrinkDTO[]>([]);

async function getAllDrinks() {
    const drinks = await getDrinks();
    console.log(JSON.stringify(drinks));
    drinksState.value = drinks ?? [];
}

async function createDrink(drink: DrinkDTO) {
    const worked = await postDrink(drink);

    if (worked) {
        await getAllDrinks();
    }
    console.log(`Posting drink worked: ${worked}`);
}

export function useDrinks() {

    return {
        drinksState: readonly(drinksState),
        getAllDrinks,
        createDrink
    }
}