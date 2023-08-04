export interface IBcastFilters {
    maxDistMeters: {
        favorite: number;
        all: boolean;
    };
    availability: {
        isVacantSeats: boolean;
        isSoldOutSeats: boolean;
        all: boolean;
    };
    tag: {
        favorite: string[];
        all: boolean;
    };
    author: {
        isMe: boolean;
        isOtherUsers: boolean;
        all: boolean;
    };
    partecipation: {
        isPartecipating: boolean;
        isNotPartecipating: boolean;
        all: boolean;
    };
}