import {PriceHistoryDTO} from "./PriceHistoryDTO";

export class CryptoDTO {
    constructor(public Symbol: string, public Name: string, public PriceHistory: PriceHistoryDTO[]) {}
}