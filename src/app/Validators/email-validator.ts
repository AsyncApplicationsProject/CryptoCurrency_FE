import { Directive } from "@angular/core"
import {AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
    selector:"[emailValidator]",
    providers: [{provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true}]
})

export class EmailValidator implements Validator {
    static validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value)
            return null;
        return EmailValidator.isValid(control.value) ? null : {EmailValidator: true};
    }

    validate(control: FormControl) : ValidationErrors | null {
        return EmailValidator.validate(control);
    }

    private static isValid(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}
