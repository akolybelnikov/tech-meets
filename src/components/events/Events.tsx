import React, { useState, useEffect } from 'react';
import { Event } from '../../models/Event';
import axios, { AxiosResponse } from 'axios';
import {Flex as RebassFlex} from 'rebass'

import EventCard from './Event'

const Flex = (props: any) => <RebassFlex {...props} sx={{flexWrap: 'wrap'}} />

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
        <Flex>
            {
                events && events.map((event, idx) => (
                    <EventCard key={idx} event={event} />

                ))
            }
        </Flex>
    )
}