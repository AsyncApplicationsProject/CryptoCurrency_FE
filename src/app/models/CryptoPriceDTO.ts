export class CryptoPriceDTO {
    constructor(public Symbol: string, public Name: string, public Data: Date, public Price: number) {}
}