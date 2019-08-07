import React from 'react';
import { Event } from '../../models/Event';
import FlexContainer from '../shared/FlexContainer';
import EventCard from './Event';

export default ({ events }: { events: Event[] }) => {

    return (
        <FlexContainer sx={{ flexWrap: 'wrap' }}>
            {
                events && events.map((event, idx) => (
                    <EventCard key={idx} event={event} />

                ))
            }
        </FlexContainer>
    )
}