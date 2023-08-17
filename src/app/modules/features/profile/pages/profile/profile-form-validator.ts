import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IUserInfo } from "src/interfaces/user-info";
import { FormValidator } from "src/models/form-validator";

export class ProfileFormValidator extends FormValidator {
  constructor(userInfo: IUserInfo) {
    super();
    this._formGroup = new FormGroup({
      username: new FormControl(userInfo?.username, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(16),
      ]),
    });
  }
}
