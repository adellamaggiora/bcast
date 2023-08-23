import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormValidator } from "src/models/form-validator";
import { MetersToKmPipe } from "../../pipes/meters-to-km.pipe";
import { TAvailability } from "src/interfaces/filters/availability";
import { TAuthor } from "src/interfaces/filters/author";
import { IBcastFilters } from "src/interfaces/filters/bcast-filters";
import { TPartecipation } from "src/interfaces/filters/partecipation";
import { DEFALT_FILTERS } from "src/constants";

export class BcastFiltersFormValidartor extends FormValidator {

    private _generateTagFormControl(tag: string) {
        return new FormControl<string>(tag, [Validators.maxLength(24)]);
    }

    constructor(bcastFilters: IBcastFilters) {

        if (!bcastFilters) {
            bcastFilters = DEFALT_FILTERS;
        }

        super();

        const tagFormControls = bcastFilters?.tag?.favorite?.map(_ => this._generateTagFormControl(_));
        
        this._formGroup = new FormGroup({
            maxDistMeters: new FormGroup({
                favorite: new FormControl<number>(bcastFilters?.maxDistMeters?.favorite),
                any: new FormControl<boolean>(bcastFilters?.maxDistMeters?.any)
            }),
            tag: new FormGroup({
                temp: this._generateTagFormControl(''),
                favorite: new FormArray(tagFormControls),
                any: new FormControl(bcastFilters?.tag?.any)
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
        const isAllowed = this.getFormControl(['maxDistMeters', 'any'])?.value;
        return isAllowed;
    }

    get tag(): FormArray {
        return this.getFormControl(['tag', 'favorite']) as FormArray;
    }

    get anyTagIsAllowed(): boolean {
        const isAllowed = this.getFormControl(['tag', 'any'])?.value === true;
        return isAllowed;
    }

    get anyDistancelIsAllowed(): boolean {
        const isAllowed = this.getFormControl(['maxDistMeters', 'any'])?.value === true;
        return isAllowed;
    }

    get anyAvailabilityIsAllowed(): boolean {
        const isAllowed = this.getFormControl(['availability'])?.value === 'any';
        return isAllowed;
    }

    get anyAuthorIsAllowed(): boolean {
        const isAllowed = this.getFormControl(['author'])?.value === 'any';
        return isAllowed;
    }

    get anyPartecipationIsAllowed(): boolean {
        const isAllowed = this.getFormControl(['partecipation'])?.value === 'any';
        return isAllowed;
    }

    get tempTagIsInvalid(): boolean {
        const isInvalid = this.getFormControl(['tag', 'temp'])?.invalid;
        return isInvalid;
    }

    removeTag(index: number) {
        this.tag.removeAt(index);
    }

    addTag() {
        let tempTagFormControl = this.getFormControl(['tag', 'temp']);
        if (tempTagFormControl?.value) {
            const formControl = this._generateTagFormControl(tempTagFormControl.value?.toLowerCase()?.trim());
            this.tag.push(formControl);
            // temp tag clear
            tempTagFormControl.setValue('');
        }
    }

    clearDistanceFilters() {
        const formControl = this.getFormControl(['maxDistMeters', 'any']);
        formControl.setValue(true);
    }

    clearTagFilters() {
        const formControl = this.getFormControl(['tag', 'any']);
        formControl.setValue(true);
    }

    clearAvailabilityFilters() {
        const formControl = this.getFormControl(['availability']);
        formControl.setValue('any');
    }

    clearAuthorFilters() {
        const formControl = this.getFormControl(['author']);
        formControl.setValue('any');
    }

    clearPartecipationFilters() {
        const formControl = this.getFormControl(['partecipation']);
        formControl.setValue('any');
    }

    clearAllFilters() {
        this.clearDistanceFilters();
        this.clearTagFilters();
        this.clearAvailabilityFilters();
        this.clearAuthorFilters();
        this.clearPartecipationFilters();
        this._formGroup.markAsDirty();
    }

}