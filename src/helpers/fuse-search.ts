import Fuse, { FuseOptions } from 'fuse.js'
import { TechEvent } from '../models/Event'

export default function searchEvents(term: string, events: any): TechEvent[] {
  let searchItems: TechEvent[] = []
  let results: any[]

  const options: FuseOptions<any> = {
    shouldSort: true,
    includeMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 1000,
    keys: ['name', 'cityName'],
  }

  const fuse = new Fuse(events, options)
  results = fuse.search(term)

  if (results.length) {
    for (let result of results) {
      if (result.matches.length) {
        searchItems = [...searchItems, ...[result.item]]
      }
    }
  }
  return searchItems
}
