import { IBcast } from "./bcast";

export interface IBcastDetail extends IBcast {
    joined: boolean;
    distMeters: number;
}