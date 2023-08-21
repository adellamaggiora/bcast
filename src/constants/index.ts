import { IBcastFilters } from "src/interfaces/filters/bcast-filters";

export const BCAST_MAIN_IMAGE_NAME = 'main';

export const DEFALT_FILTERS: IBcastFilters = {
  maxDistMeters: {
    any: true,
    favorite: 50000
  },
  tag: {
    any: true,
    favorite: ['figa']
  },
  author: 'any',
  availability: 'any',
  partecipation: 'any'
}