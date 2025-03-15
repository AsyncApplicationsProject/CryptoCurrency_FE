import {UserCryptoDTO} from "./UserCryptoDTO";

export class UserDTO {
    constructor(public Email: string, public FirstName: string, public LastName: string, public Balance: number, public Wallet: UserCryptoDTO[]) { }
}