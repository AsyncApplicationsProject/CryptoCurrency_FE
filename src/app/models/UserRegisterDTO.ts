export class UserRegisterDTO {
    constructor(public email: string, public firstName: string, public lastName: string, public password: string, public phoneNumber: number | null) {}
}