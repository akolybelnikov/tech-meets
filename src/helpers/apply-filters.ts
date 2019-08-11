import getHours from 'date-fns/get_hours'
import { TechEvent } from '../models/Event'
import { Filters } from '../models/Filters'
import { Hours } from '../models/Hours'
import searchEvents from './fuse-search'
import getUTCDate from './utc-date'

const inRange = (val: number, range: Hours): boolean => {
  if ((val === 0 || val < 6) && range.min === 21) {
    return true
  }
  return val >= range.min && val < range.max
}

export default function applyFilters(
  events: TechEvent[],
  filters: Filters,
): TechEvent[] {
  if (filters.searchTerm) {
    events = searchEvents(filters.searchTerm, events)
  }
  if (filters.isFree) {
    events = events.filter(event => event.isFree)
  }
  if (filters.hours.length) {
    events = events.filter(event =>
      filters.hours.some(hours =>
        inRange(getHours(getUTCDate(event.startDate)), hours),
      ),
    )
  }

  return events
}
