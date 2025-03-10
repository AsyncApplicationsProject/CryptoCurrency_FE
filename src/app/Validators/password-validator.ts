import { Directive } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: "[passwordValidator]",
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true }]
})

export class PasswordValidator implements Validator {

    // Main validation method that checks the password against multiple rules
    static validate(control: AbstractControl): ValidationErrors | null {
        // If the field is empty or null, skip validation
        if (!control.value) {
            return null;
        }

        const password = control.value;

        // Check if the password meets all criteria (min length, uppercase, lowercase, digit, special char)
        if (
            PasswordValidator.hasMinLength(password) &&
            PasswordValidator.hasUpperCase(password) &&
            PasswordValidator.hasLowerCase(password) &&
            PasswordValidator.hasDigit(password) &&
            PasswordValidator.hasSpecialChar(password)
        ) {
            return null; // Return null if all checks pass
        }

        // Return an error if any of the conditions fail
        return { PasswordValidator: true };
    }

    // Wrapper for the static validation method
    validate(control: FormControl): ValidationErrors | null {
        return PasswordValidator.validate(control);
    }

    // Check if the password has a minimum length of 8 characters
    private static hasMinLength(password: string): boolean {
        return password.length >= 8;
    }

    // Check if the password contains at least one uppercase letter
    private static hasUpperCase(password: string): boolean {
        return /[A-Z]/.test(password);
    }

    // Check if the password contains at least one lowercase letter
    private static hasLowerCase(password: string): boolean {
        return /[a-z]/.test(password);
    }

    // Check if the password contains at least one digit
    private static hasDigit(password: string): boolean {
        return /\d/.test(password);
    }

    // Check if the password contains at least one special character
    private static hasSpecialChar(password: string): boolean {
        return /[!@#$%^&*(),.?":{}|<>]/.test(password);
    }
}