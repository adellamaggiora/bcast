import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { IGeoLocation } from "src/interfaces/geo-location";
import { FormValidator } from "src/models/form-validator";

export class BcastTemplateFormValidator extends FormValidator {

    private _imageUrl: string;

    get imageUrl(): string {
        return this._imageUrl;
    }

    get tag() {
        return this._formGroup?.controls?.['tag'] as FormArray;
    }

    get image() {
        return this._formGroup?.controls?.['image'] as FormControl<File>;
    }

    constructor() {
        super();
        this._formGroup = new FormGroup({
            title: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
            content: new FormControl<string>(''),
            maxUsers: new FormControl<number>(10, [Validators.min(2)]),
            tempTag: new FormControl<string>('', [Validators.minLength(3), Validators.maxLength(12)]),
            tag: new FormArray([]),
            // IONIC BUG - if you pass a Date instance to the init value it will raise an error 
            expiresAt: new FormControl<Date>(null, [Validators.required]),
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


    //#region public

    addTag(tag: string) {
        this.tag.push(this._generateTagFormControl(tag?.toLowerCase()?.trim()));
    }

    removeTag(index: number) {
        this.tag.removeAt(index);
    }

    setImage(image: File, imageUrl: string) {
        this._formGroup.controls['image'] = this._generateFormControlImage(image);
        this._imageUrl = imageUrl;
    }

    //#endregion
    
}

