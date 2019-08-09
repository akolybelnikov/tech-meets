import React, { Fragment } from 'react';
import Moment from 'react-moment';
import styled, { keyframes } from 'styled-components';
import { City } from '../../models/City';
import { TechEvent } from '../../models/Event';
import { EventGroup } from '../../models/EventGroup';
import Card from '../shared/Card';
import Divider from '../shared/Divider';
import FlexContainer from '../shared/FlexContainer';
import Text from '../shared/Text';
import EventRow from './EventRow';

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
const EventCard = styled(Card)`
  animation: ${slideInUp} 500ms ease-out;
  box-shadow: 2px 2px 10px ${props => props.theme.colors.darkBlue};
  border-radius: 4px;
  background: #fff;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.05);
    background: ${props => props.theme.colors.lightGreen};
  }
`

export default (
  { eventGroup, cities, userEvents, fetchUserEvents }:
    { eventGroup: EventGroup, cities: City[], userEvents: TechEvent[], fetchUserEvents: Function }) => {
  const { date, events } = eventGroup

  return (
    <FlexContainer width={['95%', '100%']} m={'0 auto'}>
      {date && <Text><Moment format="dddd Do MMMM">{date}</Moment></Text>}
      <EventCard mt={[2, 3]} mb={[3, 4]}>
        {events.map((event, idx) => {
          const joined = (userEvents.findIndex(joinedEvent => joinedEvent.id === event.id) !== -1)

          return (
            <Fragment key={idx}>
              <EventRow
                event={event}
                city={cities.filter(city => city.id === event.city)[0]}
                joined={joined}
                fetchUserEvents={fetchUserEvents}
              />
              {(idx < events.length - 1) && <Divider />}
            </Fragment>
          )
        })}
      </EventCard>
    </FlexContainer>
  )
}