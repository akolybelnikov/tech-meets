import getHours from 'date-fns/get_hours';
import React, { Fragment } from 'react';
import { Subscription } from 'rxjs';
import searchEvents from '../../helpers/fuse-search';
import getUTCDate from '../../helpers/utc-date';
import { TechEvent } from '../../models/Event';
import { Filters } from '../../models/Filters';
import { Hours } from '../../models/Hours';
import { $filters, filtersService } from '../../services/filters.service';
import Header from '../layout/Header';
import Flex from '../shared/Flex';
import Search from './Search';
import Switch from './Switch';
import ToggleButtonGroup from './ToggleButtonGroup';

function CurrentFilters(
    { events, userEvents, setView }:
        {
            events: TechEvent[],
            userEvents: TechEvent[],
            setView: Function,
        }
) {
    const inRange = (val: number, range: Hours): boolean => {
        if (val === 0 && range.min === 21) {
            return true
        }
        return val >= range.min && val < range.max
    }

    const setRenderedEvents = (): void => {
        const filtersSubscription: Subscription = $filters.subscribe((curr: Filters) => {
            let filteredEvents: TechEvent[] = curr.view === 'all' ? events.slice() : userEvents.slice()
            if (curr.searchTerm) {
                filteredEvents = searchEvents(curr.searchTerm, filteredEvents)
            }
            if (curr.isFree) {
                filteredEvents = filteredEvents.filter(event => event.isFree)
            }
            if (curr.hours.length) {
                filteredEvents = filteredEvents.filter(event => curr.hours.some(hours => inRange(getHours(getUTCDate(event.startDate)), hours))
                )
            }
            setView(true)
            filtersService.setEvents(filteredEvents)
        })


        filtersSubscription.unsubscribe()
    }

    return (
        <Fragment>
            <Header setSubset={setRenderedEvents} setView={setView} />
            <Flex
                px={[1, 0]}
                sx={{
                    alignItems: ['flex-start', 'center'],
                    justifyContent: ['space-between'],
                    flexDirection: ['column', 'row']
                }}>
                <Search setEvents={setRenderedEvents} />
                <Switch filterEvents={setRenderedEvents} />
            </Flex>
            <ToggleButtonGroup setEvents={setRenderedEvents} />
        </Fragment>
    )
}

export default CurrentFilters