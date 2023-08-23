import { IBcast } from "src/interfaces/bcast";
import { TAuthor } from "src/interfaces/filters/author";
import { TAvailability } from "src/interfaces/filters/availability";
import { IBcastFilters } from "src/interfaces/filters/bcast-filters";
import { TPartecipation } from "src/interfaces/filters/partecipation";
import { IMessage } from "src/interfaces/message";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";
import { TRawAuthor } from "src/interfaces/raw/raw-filters/raw-author";
import { TRawAvailability } from "src/interfaces/raw/raw-filters/raw-availability";
import { IRawBcastFilters } from "src/interfaces/raw/raw-filters/raw-bcast-filters";
import { TRawPartecipation } from "src/interfaces/raw/raw-filters/raw-partecipation";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { IUserInfo } from "src/interfaces/user-info";


const buildRawUserInfo = (userId: string, userInfo: Partial<IUserInfo>): Partial<IRawUserInfo> => ({
    id: userId,
    username: userInfo?.username
});

const buildRawBcast = (userId: string, bcast: Partial<IBcast>): Partial<IRawBcast> => ({
    user_id: userId,
    expires_at: bcast?.expiresAt? new Date(bcast?.expiresAt) : null,
    max_users: bcast?.maxUsers || null,
    tag: bcast?.tag || null,
    title: bcast?.title || null,
    content: bcast?.content || null,
    location: `POINT(${bcast?.location.lng} ${bcast?.location.lat})`,
    hide_position: bcast?.hidePosition || null
});

const buildRawMessage = (userId: string, bcastId: string, message: IMessage): Partial<IRawMessage> => ({
    user_id: userId,
    bcast_id: bcastId,
    content: message.content
})

const filtersToRawFilters = (filters: IBcastFilters): IRawBcastFilters => {

    const authorMap = new Map<TAuthor, TRawAuthor>([
        ['any', null],
        ['me', 'me'],
        ['others', 'others']
    ])

    const availabilityMap = new Map<TAvailability, TRawAvailability>([
        ['any', null],
        ['vacant', 'vacant'],
        ['soldOut', 'soldOut']
    ])

    const partecipationMap = new Map<TPartecipation, TRawPartecipation>([
        ['any', null],
        ['partecipating', 'partecipating'],
        ['notPartecipating', 'notPartecipating']
    ])

    const x = authorMap.get(filters?.author) || null

    const result: IRawBcastFilters = {
        author: authorMap.get(filters?.author) || null,
        partecipation: partecipationMap.get(filters?.partecipation) || null,
        availability: availabilityMap.get(filters?.availability) || null,
        tag: filters?.tag?.any ? null : filters?.tag?.favorite,
        maxDistanceMeters: filters?.maxDistMeters?.any ? null : filters?.maxDistMeters?.favorite
    };

    return result;
}

export default {
    buildRawUserInfo,
    buildRawBcast,
    buildRawMessage,
    filtersToRawFilters
}