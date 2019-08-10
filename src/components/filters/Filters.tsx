import React, { Fragment } from 'react'
import Search from './Search';
import Switch from './Switch';
import ToggleButtonGroup from './ToggleButtonGroup';
import Flex from '../shared/Flex';
import { TechEvent } from '../../models/Event';

function Filters(
    { subset, events, userEvents, setRenderedEvents, setSearchTerm, setFilteredEvents, setTimeOfTheDay, setView }:
        {
            subset: string,
            events: TechEvent[],
            userEvents: TechEvent[],
            setRenderedEvents: Function,
            setSearchTerm: Function,
            setFilteredEvents: Function,
            setTimeOfTheDay: Function,
            setView: Function
        }
) {
    return (
        <Fragment>
            <Flex
                px={[2, 0]}
                sx={{
                    alignItems: ['flex-start', 'center'],
                    justifyContent: ['space-between'],
                    flexDirection: ['column', 'row']
                }}>
                <Search
                    events={subset === 'all' ? events : userEvents}
                    setEvents={setRenderedEvents}
                    setView={setView}
                    setSearchTerm={setSearchTerm} />
                <Switch filterEvents={setFilteredEvents} />
            </Flex>
            <ToggleButtonGroup toggle={setTimeOfTheDay} />
        </Fragment>
    )
}

export default Filters