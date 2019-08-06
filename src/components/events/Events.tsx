import React, { useState, useEffect } from 'react';
import { Event } from '../../models/Event';
import axios, { AxiosResponse } from 'axios';
import EventCard from './Event'

export default () => {
    const [events, setEventsData] = useState<Event[]>([])

    useEffect(() => {
        async function fetchEventsData() {
            const { data }: AxiosResponse = await axios('http://localhost:3001/events')

            setEventsData(data);
        }

        fetchEventsData();
    }, [])

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