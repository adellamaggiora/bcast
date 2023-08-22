import { IGeoLocation } from "./geo-location";

export interface IListedBcast {
    id: string;
    userId: string;
    title: string;
    expiresAt: Date;
    location: IGeoLocation;
    maxUsers: number;
    tag: string[];
    image: File;
    distMeters: number;
    joined: boolean;
    joinedUsers: number;
}