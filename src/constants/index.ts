import { IBcastFilters } from "src/interfaces/bcast-filters";

export const DEFALT_FILTERS: IBcastFilters = {
    maxDistMeters: {
        all: true,
        favorite: null
    },
    author: {
      all: true,
      isMe: false,
      isOtherUsers: false
    },
    availability: {
      all: true,
      isSoldOutSeats: false,
      isVacantSeats: false
    },
    partecipation: {
      all: true,
      isInterested: false,
      isNotPartecipating: false,
      isPartecipating: false
    },
    tag: {
      all: true,
      favorite: []
    }
  }