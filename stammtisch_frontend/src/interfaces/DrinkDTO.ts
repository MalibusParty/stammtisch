import type { DrinkType } from "@/enums/DrinkType"

export default interface DrinkDTO {
    drink_id: number,
    drinkType: DrinkType,
    volume: number
}