import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import dateFns from "src/functions/date-fns";
import { IGeoLocation } from "src/interfaces/geo-location";
import { FormValidator } from "src/models/form-validator";

export class BcastTemplateFormValidator extends FormValidator {

    private _imageUrl: string = 'assets/pictures/card-media-resized.png';

    get imageUrl(): string {
        return this._imageUrl;
    }

    get tag() {
        return this._formGroup?.controls?.['tag'] as FormArray;
    }

    get image() {
        return this._formGroup?.controls?.['image'] as FormControl<File>;
    }

    get tempTagIsInvalid(): boolean {
        const isInvalid = this.getFormControl(['tempTag'])?.invalid;
        return isInvalid;
    }

    get maxUsersIsOpenNumber(): boolean {
        const isOpenNumber = this.getFormControl(['maxUsers', 'openNumber'])?.value === true;
        return isOpenNumber
    }

    get useCurrentLocationIsTrue(): boolean {
        const useCurrentLocationIsTrue = this.getFormControl(['location', 'useCurrent'])?.value === true;
        return useCurrentLocationIsTrue
    }

    constructor() {
        super();
        this._formGroup = new FormGroup({
            title: new FormControl<string>('', [Validators.required, Validators.maxLength(24)]),
            content: new FormControl<string>(''),
            maxUsers: new FormGroup({
                openNumber: new FormControl<boolean>(true),
                total: new FormControl<number>(10)
            }),
            tempTag: new FormControl<string>('', [Validators.maxLength(24)]),
            tag: new FormArray([]),
            // IONIC BUG - if you pass a Date instance to the init value it will raise an error 
            expiresAt: new FormControl<any>(dateFns.getISODateTomorrow(), [Validators.required]),
            location: new FormGroup({
                useCurrent: new FormControl<boolean>(true),
                selected: new FormControl<IGeoLocation>({ lat: null, lng: null }, [Validators.required])
            }),
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

    addTag() {
        let tempTagFormControl = this.getFormControl(['tempTag']);
        if (tempTagFormControl?.value) {
            const formControl = this._generateTagFormControl(tempTagFormControl.value?.toLowerCase()?.trim());
            this.tag.push(formControl);
            // temp tag clear
            tempTagFormControl.setValue('');
        }
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

