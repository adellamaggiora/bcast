import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IGeoLocation } from "src/interfaces/geo-location";
import { FormValidator } from "src/models/form-validator";

export class BcastTemplateFormValidator extends FormValidator {

    get tag() {
        return this._formGroup?.controls?.['tag'] as FormArray;
    }

    get image() {
        return this._formGroup?.controls?.['image'] as FormControl<File>;
    }

    get imageUrl() {
        return this._imageUrl;
    }


    constructor() {
        super();
        this._formGroup = new FormGroup({
            title: new FormControl<string>('', [Validators.required]),
            content: new FormControl<string>(''),
            maxUsers: new FormControl<number>(10, [Validators.min(2)]),
            tempTag: new FormControl<string>('', [Validators.minLength(3), Validators.maxLength(16)]),
            tag: new FormArray([]),
            expiresAt: new FormControl<Date>(null),
            location: new FormControl<IGeoLocation>({ lat: null, lng: null }, [Validators.required]),
            image: this._generateFormControlImage(null)     
        })
    }

    private _generateTagFormControl(tag: string) {
        return new FormControl(tag);
    }

    private _generateFormControlImage(image: File) {
        return new FormControl<File>(image);
    }

    private _imageUrl: string;

    //#region public

    addTag(tag: any) {
        this.tag.push(this._generateTagFormControl(tag));
    }

    removeTag(index: number) {
        this.tag.removeAt(index);
    }

    setImage(image: File, imageUrl: string) {
        this._imageUrl = imageUrl
        this._formGroup.controls['image'] = this._generateFormControlImage(image);
    }

    //#endregion
    
}

