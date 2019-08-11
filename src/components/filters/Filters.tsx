import React, { Fragment } from 'react';
import { Subscription } from 'rxjs';
import applyFilters from '../../helpers/apply-filters';
import { TechEvent } from '../../models/Event';
import { Filters } from '../../models/Filters';
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
    const setRenderedEvents = (): void => {
        const filtersSubscription: Subscription = $filters.subscribe((curr: Filters) => {
            let filteredEvents: TechEvent[]
            if (curr.view === 'all') {
                filteredEvents = applyFilters(events, curr)
            } else {
                filteredEvents = applyFilters(userEvents, curr)
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