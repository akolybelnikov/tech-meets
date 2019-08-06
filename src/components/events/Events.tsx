import React, { useState } from 'react';
import { Event } from '../../models/Event';
import { useAsyncEffect } from '../../hooks/asyncEffect';
import axios, { AxiosResponse } from 'axios';
import EventCard from './Event'

export default () => {
    const [events, setEventsData] = useState<Event[]>([])

    useAsyncEffect(async () => {
        const { data }: AxiosResponse = await axios('http://localhost:3001/events')

        setEventsData(data)
    })

    return (
        <React.Fragment>
            {
                events && events.map((event, idx) => (
                    <EventCard key={idx} event={event} />

                ))
            }
        </React.Fragment>
    )
}