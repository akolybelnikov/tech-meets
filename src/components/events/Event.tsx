import React from 'react';
import { Card } from 'rebass';
import styled, { keyframes } from 'styled-components';
import { Event } from '../../models/Event';
import SubTitle from '../shared/SubTitle';

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
  width: 256,
  height: 128,
  textAlign: 'center',
  flex: ['100%', '50%'],
})`
  animation: ${slideInUp} 500ms ease-out;
`

export default ({ event }: { event: Event }) =>
  <EventCard>
    <SubTitle>{event.name}</SubTitle>
  </EventCard>