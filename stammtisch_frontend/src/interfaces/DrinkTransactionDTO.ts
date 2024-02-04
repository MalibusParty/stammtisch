import type { DrinkTransaction } from "./DrinkTransaction";

export default interface DrinkTransactionDTO extends DrinkTransaction {
    username: string
}