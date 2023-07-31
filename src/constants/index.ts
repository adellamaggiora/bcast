import { BcastFilters } from "src/interfaces/bcast-filters";

export const DEFALT_FILTERS: BcastFilters = {
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