import { isSameDay } from 'date-fns';
import React from 'react';
import { City } from '../../models/City';
import { TechEvent } from '../../models/Event';
import { EventGroup } from '../../models/EventGroup';
import FlexContainer from '../shared/FlexContainer';
import SubTitle from '../shared/SubTitle';
import EventCard from './EventGroup';

export default (
    { events, cities, userEvents, fetchUserEvents, searchView }:
        {
            events: TechEvent[],
            cities: City[],
            userEvents: TechEvent[],
            fetchUserEvents: Function,
            searchView: boolean
        }) => {

    const groups = events.reduce((groups: EventGroup[], curr: TechEvent): EventGroup[] => {
        let city: City | undefined = cities.find(city => city.id === curr.city)
        if (city) {
            curr.cityName = city.name
        }
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
        {groups.map((group, idx) => (
            <EventCard
                key={idx}
                eventGroup={group}
                userEvents={userEvents}
                fetchUserEvents={fetchUserEvents} />
        )
        )}

        {!groups.length && <FlexContainer minHeight={'50vh'} justifyContent={'center'}>
            {!searchView && <SubTitle textAlign={'center'}>
                You have not signed up for eny events yet.
                <br /><br />
                You can fix that by going back to the list of all our events and signing up for one!
            </SubTitle>}
            {searchView && <SubTitle textAlign={'center'}>
                You search did not bring any results.
                <br /><br />
                You can try changing the search terms!
            </SubTitle>}
        </FlexContainer>}
    </FlexContainer>
}