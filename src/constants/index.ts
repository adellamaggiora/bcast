import { IBcastFilters } from "src/interfaces/filters/bcast-filters";

export const BCAST_MAIN_IMAGE_NAME = 'main';

export const DEFALT_FILTERS: IBcastFilters = {
  maxDistMeters: {
    all: true,
    favorite: 50000
  },
  tag: {
    all: true,
    favorite: ['figa']
  },
  author: 'all',
  availability: 'all',
  partecipation: 'all'
}