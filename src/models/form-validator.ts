import { FormGroup } from "@angular/forms";

export class FormValidator {

    protected _formGroup: FormGroup;
    
    public get formGroup() {
        return this._formGroup;
    }

    public get formButtonDisabled(): boolean {
        return this._formGroup.pristine || this._formGroup.invalid;
    }

    constructor() { }

}