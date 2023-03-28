import { FormGroup } from "@angular/forms";

export class FormValidator {

    protected _formGroup: FormGroup;
    public get formGroup() {
        return this._formGroup;
    }

    constructor() { }

}