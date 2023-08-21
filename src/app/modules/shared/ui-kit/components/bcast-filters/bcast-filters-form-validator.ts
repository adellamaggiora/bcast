import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidator } from "src/models/form-validator";
import { MetersToKmPipe } from "../../pipes/meters-to-km.pipe";
import { TAvailability } from "src/interfaces/filters/availability";
import { TAuthor } from "src/interfaces/filters/author";
import { IBcastFilters } from "src/interfaces/filters/bcast-filters";
import { TPartecipation } from "src/interfaces/filters/partecipation";

export class BcastFiltersFormValidartor extends FormValidator {

    private _generateTagFormControl(tag: string) {
        return new FormControl<string>(tag, [Validators.minLength(3), Validators.maxLength(12)]);
    }

    constructor(bcastFilters: IBcastFilters) {

        super();

        const tagFormControls = bcastFilters?.tag?.favorite?.map(_ => this._generateTagFormControl(_));
        
        this._formGroup = new FormGroup({
            maxDistMeters: new FormGroup({
                favorite: new FormControl<number>(bcastFilters?.maxDistMeters?.favorite),
                all: new FormControl<boolean>(bcastFilters?.maxDistMeters?.all)
            }),
            tag: new FormGroup({
                temp: this._generateTagFormControl(''),
                favorite: new FormArray(tagFormControls),
                all: new FormControl(bcastFilters?.tag?.all)
            }),
            availability: new FormControl<TAvailability>(bcastFilters?.availability),
            author: new FormControl<TAuthor>(bcastFilters?.author),
            partecipation: new FormControl<TPartecipation>(bcastFilters?.partecipation)
        })        
    }

    get maxDistLabel(): string {
        const meters = this.getFormControl(['maxDistMeters', 'favorite'])?.value;
        const km = new MetersToKmPipe().transform(meters);
        return `${km} Km`;
        
    }

    get anyDistanceAllowed(): boolean {
        const isAllowed = this.getFormControl(['maxDistMeters', 'all'])?.value;
        return isAllowed;
    }

    get tag(): FormArray {
        return this.getFormControl(['tag', 'favorite']) as FormArray;
    }

    get anyTagAllowed(): boolean {
        const isAllowed = this.getFormControl(['tag', 'all'])?.value;
        return isAllowed;
    }

}