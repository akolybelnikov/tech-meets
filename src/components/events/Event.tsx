import React from 'react'
import { Event } from '../../models/Event'
import { Card } from 'rebass'

const EventItem = (props: any) => <Card {...props} />

export default ({ event }: { event: Event }) => <EventItem>{event.name}</EventItem>