import { Hours } from './Hours'

enum HoursRange {
  '0,24' = 0,
  '6,12' = 1,
  '12,17' = 2,
  '17,21' = 3,
  '21,30' = 4,
}

function mapRangeToHours(range: string): Hours {
  const hours = range.split(',')
  return { min: Number(hours[0]), max: Number(hours[1]) }
}

export { HoursRange, mapRangeToHours }
