import { Hours } from './Hours';
export class Filters {
  searchTerm: string
  isFree: boolean
  hours: Hours[]
  view: string

  constructor(searchTerm = '', isFree = false, hours = [], view = 'all') {
    this.searchTerm = searchTerm
    this.isFree = isFree
    this.hours = hours
    this.view = view
  }
}
