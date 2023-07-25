import { IGeoLocation } from "./geo-location";

export interface IBcast {
    id: string;
    userId: string;
    createdAt: Date;
    expiresAt: Date;  
    title: string;
    location: IGeoLocation;
    maxUsers?: number;
    tag?: string[];
    image?: File;
    content?: string;
}