import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidator } from "src/models/form-validator";

export class LoginFormValidator extends FormValidator {

    constructor() {
        super();
        this._formGroup = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.min(8), Validators.max(24)]),
            confirmPassword: new FormControl('', [Validators.min(8),Validators.max(24)])
        })
    }

    getCredentials() {
        const { email, password } = this._formGroup.value;
        return { email, password };
    }


}