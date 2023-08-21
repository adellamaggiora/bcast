import { TAuthor } from "./author";
import { TAvailability } from "./availability";
import { TPartecipation } from "./partecipation";

export interface IBcastFilters {
    maxDistMeters: {
        favorite: number;
        all: boolean;
    };
    tag: {
        favorite: string[];
        all: boolean;
    };
    availability: TAvailability;
    author: TAuthor;
    partecipation: TPartecipation;
}