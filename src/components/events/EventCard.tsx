import React from 'react';
import { Card } from 'rebass';
import styled, { keyframes } from 'styled-components';
import { EventGroup } from '../../models/EventGroup';
import SubTitle from '../shared/SubTitle';
import Event from './Event';

const slideInUp = keyframes`
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
    opacity: 0;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`
const EventCard = styled(Card).attrs({
  width: ['95%', '80%', '750px'],
  height: 'auto',
  textAlign: 'center',
  flex: ['100%'],
})`
  animation: ${slideInUp} 500ms ease-out;
`

export default ({ eventGroup }: { eventGroup: EventGroup }) =>
  <EventCard>
    <SubTitle>{eventGroup.date}</SubTitle>
    {eventGroup.events.map((event, idx) => (
      <Event key={idx} event={event} city={{id: 0, name: ''}} />
    ))}
  </EventCard>