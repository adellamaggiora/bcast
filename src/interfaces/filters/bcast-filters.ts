import { TAuthor } from "./author";
import { TAvailability } from "./availability";
import { TPartecipation } from "./partecipation";

export interface IBcastFilters {
    maxDistMeters: {
        favorite: number;
        any: boolean;
    };
    tag: {
        favorite: string[];
        any: boolean;
    };
    availability: TAvailability;
    author: TAuthor;
    partecipation: TPartecipation;
}