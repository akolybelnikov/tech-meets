import React from 'react';
import { Event } from '../../models/Event';
import FlexContainer from '../shared/FlexContainer';
import EventCard from './Event';
import { City } from '../../models/City';

export default ({ events, cities }: { events: Event[], cities: City[] }) => {
    return <FlexContainer sx={{ flexWrap: 'wrap' }}>
        {events && events.map((event, idx) => (<EventCard key={idx} event={event} city={cities.filter(city => city.id === event.city)[0]} />))}
    </FlexContainer>
}