import { differenceInMinutes } from 'date-fns';
import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
import styled from 'styled-components';
import { City } from '../../models/City';
import { Event } from '../../models/Event';
import Box from '../shared/Box';
import Button from '../shared/Buttons';
import FlexRow from '../shared/FlexRow';
import SubTitle from '../shared/SubTitle';
import Text from '../shared/Text';
import customAnimationStyles from './events.module.scss'

const RowItem = styled(Box).attrs({
  padding: [1, 2]
})``

const Animated = styled(Modal)`
  .transitionEnter {
    transform: scale(0);
  }
  .transitionEnterActive {
    transform: scale(1);
    transition: transform 1000ms ease;
  }
  .transitionExit {
    transform: scale(1);
  }
  .transitionExitActive {
    transform: scale(0);
    transition: transform 1000ms ease;
  }
`

export default ({ event, city }: { event: Event, city: City }) => {
  const [open, setModal] = useState(false)

  const { startDate, name, isFree, endDate } = event

  const formatDuration = (minutes: number): string => {
    const hours: number = Math.floor(minutes / 60)
    const rest: number = minutes % 60
    return rest !== 0 ? `${hours}h ${rest}m` : `${hours}h`
  }

  const onOpenModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  return (
    <Fragment>
      <FlexRow>
        <RowItem sx={{ flex: ['15%', '10%'] }}>
          {startDate && <Moment format="HH:mm">
            {startDate}
          </Moment>}
        </RowItem>
        <RowItem sx={{ display: 'flex', flex: ['80%', '70%'], justifyContent: 'flex-start' }}>
          <Box sx={{ flex: ['60%'] }}>
            <SubTitle>{name && name}</SubTitle>
            <Box mt={[1]} sx={{ flex: '50%' }}><Text>{city && city.name} - {startDate && endDate && formatDuration(
              differenceInMinutes(endDate, startDate)
            )}</Text></Box>
          </Box>
          <Box sx={{ flex: '10%', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <SubTitle ml={1}>{isFree && <Text color="darkGreen">Free!!!</Text>}</SubTitle>
          </Box>
        </RowItem>
        <RowItem sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: ['flex-start', 'center'],
          flex: '1 1 auto',
          alignItems: ['center']
        }}>
          <Button variant='primaryInverted' onClick={onOpenModal}>Sign up</Button>
        </RowItem>
      </FlexRow>
      <Animated
        open={open}
        onClose={onCloseModal}
        center
        animationDuration={500}
        classNames={{
          transitionEnter: customAnimationStyles.transitionEnter,
          transitionEnterActive: customAnimationStyles.transitionEnterActive,
          transitionExit: customAnimationStyles.transitionExitActive,
          transitionExitActive: customAnimationStyles.transitionExitActive,
        }}
      >
        <h2>Simple centered modal</h2>
      </Animated>
    </Fragment>
  )
}