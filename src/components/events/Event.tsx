import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import { City } from '../../models/City';
import { Event } from '../../models/Event';
import Box from '../shared/Box';
import Button from '../shared/Buttons';
import Flex from '../shared/Flex';
import FlexRow from '../shared/FlexRow';
import SubTitle from '../shared/SubTitle';
import Text from '../shared/Text';
import { differenceInMinutes } from 'date-fns'

const RowItem = styled(Box).attrs({
  padding: [1, 2]
})``

export default ({ event, city }: { event: Event, city: City }) => {

  const { startDate, name, isFree, endDate } = event

  const formatDuration = (minutes: number): string => {
    const hours: number = Math.floor(minutes / 60)
    const rest: number = minutes % 60
    return rest !== 0 ? `${hours}h ${rest}m` : `${hours}h`
  }

  return (
    <FlexRow>
      <RowItem sx={{ flex: ['15%', '10%'] }}>
        {startDate && <Moment element="span" format="HH:mm">
          {startDate}
        </Moment>}
      </RowItem>
      <RowItem sx={{ display: 'flex', flex: ['80%', '70%'], justifyContent: 'flex-start' }}>
        <Box sx={{ flex: ['60%'] }}>
          <SubTitle>{name && name}</SubTitle>
          <Flex py={[1, 2]} sx={{ justifyContent: 'flex-start' }}>
            <Box sx={{ flex: '50%' }}><Text>{city && city.name}</Text></Box>
            <Box sx={{ flex: 'auto' }}>
              <Text>
                {startDate && endDate && formatDuration(
                  differenceInMinutes(endDate, startDate)
                )}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box sx={{ flex: '10%', textAlign: 'left' }}>
          <SubTitle ml={1}>{isFree && <Text color="darkGreen">Free!!!</Text>}</SubTitle>
        </Box>
      </RowItem>
      <RowItem sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Button variant='primaryInverted'>Sign up</Button>
      </RowItem>
    </FlexRow>
  )
}