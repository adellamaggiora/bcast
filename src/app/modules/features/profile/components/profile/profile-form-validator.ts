import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IUserInfo } from "src/interfaces/user-info";
import { FormValidator } from "src/models/form-validator";

export class ProfileFormValidator extends FormValidator {

    get tag() {
        return this._formGroup.controls['tag'];
    }
    
    constructor(userInfo: IUserInfo) {
        super();
        this._formGroup = new FormGroup({
            tag: new FormArray(userInfo?.tag?.map(_ => this._generateTagFormControl(_)), [])
        })
    }

    private _generateTagFormControl(tag: string) {
        return new FormControl(tag);
    }
}