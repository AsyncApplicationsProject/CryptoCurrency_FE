import { Directive } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector:"[firstLetterValidator]",
    providers: [{provide: NG_VALIDATORS, useExisting:FirstLetterValidator, multi: true}]
})

export class FirstLetterValidator implements Validator {
    static validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value)
            return null;
        return FirstLetterValidator.isValid(control.value[0]) ? null : { FirstLetterValidator: true };
    }

    validate(control: FormControl): ValidationErrors | null {
        return FirstLetterValidator.validate(control);
    }

    private static isValid(letter: string) {
        return letter == letter.toUpperCase();
    }
}