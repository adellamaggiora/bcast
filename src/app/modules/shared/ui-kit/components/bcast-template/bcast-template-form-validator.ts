import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IGeoLocation } from "src/interfaces/geo-location";
import { FormValidator } from "src/models/form-validator";

export class BcastTemplateFormValidator extends FormValidator {

    get tag() {
        return this._formGroup?.controls?.['tag'] as FormArray;
    }

    constructor() {
        super();
        this._formGroup = new FormGroup({
            title: new FormControl<string>('', [Validators.required]),
            content: new FormControl<string>(''),
            maxUsers: new FormControl<number>(10),
            tempTag: new FormControl<string>('', [Validators.minLength(3), Validators.maxLength(16)]),
            tag: new FormArray([]),
            expiresAt: new FormControl<Date>(new Date()),
            location: new FormControl<IGeoLocation>({ lat: null, lng: null }, [Validators.required]),
            image: new FormControl<File>(null)     
        })
    }

    private _generateTagFormControl(tag: string) {
        return new FormControl(tag);
    }

    addTag(tag: any) {
        this.tag.push(this._generateTagFormControl(tag));
    }

    removeTag(index: number) {
        this.tag.removeAt(index);
    }
    
}

