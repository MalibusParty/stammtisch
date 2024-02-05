import getDrinks from "@/api/getDrinks";
import postDrink from "@/api/postDrink";
import type DrinkDTO from "@/interfaces/DrinkDTO";
import { Client } from "@stomp/stompjs";
import { readonly, ref } from "vue";
import getStompClient from "@/services/StompFactory";

const DEST = '/topic/drinks';


const drinksState = ref<DrinkDTO[]>([]);
let stompClient: Client | null = null;

async function getAllDrinks() {
    const drinks = await getDrinks();
    drinksState.value = drinks ?? [];
}

async function createDrink(drink: DrinkDTO) {
    await postDrink(drink);
}

function receiveDrinks() {
    if (!stompClient) {
        stompClient = getStompClient(DEST, (message) => {
            const drinkDTO: DrinkDTO = JSON.parse(message.body);
            drinksState.value.push(drinkDTO);
        });
    }

    if (stompClient && !stompClient.active) {
        stompClient.activate();
    }
}

function endReceiveDrinks() {
    if (stompClient !== null && stompClient.active) {
        stompClient.deactivate();
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
        convertDrinkToName,
        receiveDrinks,
        endReceiveDrinks
    }
}