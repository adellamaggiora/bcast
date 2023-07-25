import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IGeoLocation } from "src/interfaces/geo-location";
import { FormValidator } from "src/models/form-validator";

export class BcastTemplateFormValidator extends FormValidator {


    constructor() {
        super();
        this._formGroup = new FormGroup({
            title: new FormControl<string>('', [Validators.required]),
            content: new FormControl<string>(''),
            maxUsers: new FormControl<number>(10),
            tag: new FormArray([]),
            expiresAt: new FormControl<Date>(new Date()),
            location: new FormControl<IGeoLocation>({ lat: null, lng: null }, [Validators.required]),
            imageFile: new FormControl<File>(null)     
        })
    }
}

