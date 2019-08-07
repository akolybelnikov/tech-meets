import React from 'react';
import Moment from 'react-moment';
import styled, { keyframes } from 'styled-components';
import { Event } from '../../models/Event';
import Box from '../shared/Box';
import Button from '../shared/Buttons';
import FlexRow from '../shared/FlexRow';
import SubTitle from '../shared/SubTitle';
import Text from '../shared/Text';


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

const RowItem = styled(Box).attrs({
  padding: [1, 2]
})``

export default ({ event }: { event: Event }) =>
  <FlexRow>
    <RowItem sx={{ flex: ['15%', '10%'] }}>
      <Moment element="span" format="HH:mm">
        {event.startDate}
      </Moment>
    </RowItem>
    <RowItem sx={{ display: 'flex', flex: ['80%', '70%'], justifyContent: 'flex-start' }}>
      <Box sx={{ flex: ['60%'] }}>
        <SubTitle>{event.name}</SubTitle>
      </Box>
      <Box sx={{ flex: 'auto', textAlign: 'left' }}>
        <SubTitle ml={1}>{event.isFree && <Text color="darkGreen">Free!!!</Text>}</SubTitle>
      </Box>
    </RowItem>
    <RowItem sx={{ flex: ['40% 0 0', 'auto'] }}>
      <Button sx={{ alignSelf: 'end' }} variant='primaryInverted'>Sign up</Button>
    </RowItem>
  </FlexRow>