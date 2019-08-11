import { BehaviorSubject, Observable } from 'rxjs'
import { TechEvent } from '../models/Event'
import { Filters } from '../models/Filters'
import { Hours } from '../models/Hours'

const filteredEvents: BehaviorSubject<TechEvent[]> = new BehaviorSubject<
  TechEvent[]
>([])
const $filteredEvents: Observable<TechEvent[]> = filteredEvents.asObservable()

const filters: BehaviorSubject<Filters> = new BehaviorSubject<Filters>(
  new Filters(),
)
const $filters: Observable<Filters> = filters.asObservable()

const filtersService = {
  setEvents(events: TechEvent[]): void {
    filteredEvents.next(events)
  },

  setFilters(curr: Filters): void {
    filters.next(curr)
  },

  setSearchTerm(searchTerm: string): void {
    filters.next({ ...filters.getValue(), ...{ searchTerm } })
  },

  setIsFree(isFree: boolean): void {
    filters.next({ ...filters.getValue(), ...{ isFree } })
  },

  setHours(hours: Hours[]): void {
    filters.next({ ...filters.getValue(), ...{ hours } })
  },

  setView(view: string): void {
    filters.next({ ...filters.getValue(), ...{ view } })
  },
}

export { filtersService, $filteredEvents, $filters }
