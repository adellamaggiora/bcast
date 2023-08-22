import { TRawAuthor } from "./raw-author";
import { TRawAvailability } from "./raw-availability";
import { TRawPartecipation } from "./raw-partecipation";

export interface IRawBcastFilters {
    maxDistanceMeters: number | null;
    tag: string[] | null;
    availability: TRawAvailability;
    author: TRawAuthor;
    partecipation: TRawPartecipation;
}