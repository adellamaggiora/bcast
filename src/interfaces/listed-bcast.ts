import { IGeoLocation } from "./geo-location";

export interface IListedBcast {
    id: string;
    userId: string;
    expiresAt: Date;
    title: string;
    location: IGeoLocation;
    distMeters: number;
    joined: boolean;
    joinedUsers: number;
    maxUsers?: number;
    tag?: string [];
    image?: File;
}