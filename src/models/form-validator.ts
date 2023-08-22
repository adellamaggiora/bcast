import { AbstractControl, FormGroup } from "@angular/forms";

export class FormValidator {

    private getFormControlRecursive(control: AbstractControl | null, pathSegments: string[]): AbstractControl | null {
        if (!control) {
            return null;
        }

        if (pathSegments.length === 0) {
            return control;
        }

        const currentSegment = pathSegments?.at(0);
        const nextControl = control.get(currentSegment);

        return this.getFormControlRecursive(nextControl, pathSegments.slice(1));
    }

    protected _formGroup: FormGroup;

    constructor() { }
    
    public get formGroup() {
        return this._formGroup;
    }

    public get formButtonDisabled(): boolean {
        return this._formGroup.pristine || this._formGroup.invalid;
    }

    public getFormControl(pathSegments: string[]): AbstractControl | null {
        return this.getFormControlRecursive(this._formGroup, pathSegments);
    }
    

}