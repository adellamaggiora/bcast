import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import { FormValidator } from "src/models/form-validator";

export class LoginFormValidator extends FormValidator {

    constructor() {
        super();
        this._formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.min(8), Validators.max(24)]),
            confirmPassword: new FormControl('', [control => this.matchPassword(control)])
        })
    }

    getCredentials() {
        const { email, password } = this._formGroup.value;
        return { email, password };
    }

    // Funzione di validazione personalizzata per verificare che la password e la conferma della password siano uguali
    private matchPassword(control: AbstractControl): ValidationErrors {

        let validationErrors: ValidationErrors;

        const password = this._formGroup?.get('password')?.value;
        const confirmPassword = control?.value;

        if (password !== confirmPassword) {
            validationErrors = { mismatch: true };
        }

        return validationErrors;
    }
}
