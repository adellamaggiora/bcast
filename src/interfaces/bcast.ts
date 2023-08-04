import { IGeoLocation } from "./geo-location";

export interface IBcast {
    id: string;
    userId: string;
    title: string;
    expiresAt: Date;
    location: IGeoLocation;
    maxUsers: number;
    tag: string[];
    image: File;
    createdAt: Date;
    content: string;
}