import React, { Fragment, MutableRefObject, useRef } from 'react';
import { Subscription } from 'rxjs';
import applyFilters from '../../helpers/apply-filters';
import { TechEvent } from '../../models/Event';
import { Filters } from '../../models/Filters';
import { $filters, filtersService } from '../../services/filters.service';
import Header from '../layout/Header';
import Button from '../shared/Buttons';
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
    const searchRef: MutableRefObject<any> = useRef()
    const switchRef: MutableRefObject<any> = useRef()
    const toggleGroupRef: MutableRefObject<any> = useRef()

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

    const clearAllFilters = () => {
        searchRef.current.reset()
        switchRef.current.reset()
        toggleGroupRef.current.reset()
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
                <Search ref={searchRef} setEvents={setRenderedEvents} />
                <Switch ref={switchRef} filterEvents={setRenderedEvents} />
            </Flex>
            <Flex
                px={[1, 0]}
                sx={{
                    alignItems: ['flex-start', 'center'],
                    justifyContent: ['space-between'],
                    flexDirection: ['column', 'row']
                }}>
                <ToggleButtonGroup ref={toggleGroupRef} setEvents={setRenderedEvents} />
                <Button onClick={clearAllFilters} mt={[3, 2]} mx={[1]} variant="secondaryInverted">Clear all filters</Button>
            </Flex>

        </Fragment>
    )
}

export default CurrentFilters