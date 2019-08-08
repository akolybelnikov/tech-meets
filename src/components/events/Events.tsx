import { isSameDay } from 'date-fns';
import React from 'react';
import { City } from '../../models/City';
import { Event } from '../../models/Event';
import { EventGroup } from '../../models/EventGroup';
import FlexContainer from '../shared/FlexContainer';
import EventCard from './EventGroup';
import SubTitle from '../shared/SubTitle';

export default ({ events, cities }: { events: Event[], cities: City[] }) => {
    const groups = events.reduce((groups: EventGroup[], curr: Event): EventGroup[] => {
        let idx = groups.findIndex((e: EventGroup) => isSameDay(e.date, curr.startDate))
        if (idx !== -1) {
            groups[idx].events = [...groups[idx].events, curr]
        } else {
            let newGroup = { date: curr.startDate, events: [curr] }
            groups = [...groups, newGroup]
        }

        return groups
    }, [])

    return <FlexContainer py={[3, 4]}>
        {groups && groups.map(
            (group, idx) => (
                <EventCard key={idx} eventGroup={group} cities={cities} />
            )
        )}
        {!groups.length && <FlexContainer minHeight={'50vh'} justifyContent={'center'}>
            <SubTitle textAlign={'center'}>You have not signed up for eny events yet.<br /><br />You can fix that by going back to the list of all our events and signing up for one!</SubTitle>
        </FlexContainer>}
    </FlexContainer>
}