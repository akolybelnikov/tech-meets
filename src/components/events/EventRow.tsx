import axios from 'axios';
import { differenceInMinutes } from 'date-fns';
import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
import styled from 'styled-components';
import { City } from '../../models/City';
import { TechEvent } from '../../models/Event';
import Box from '../shared/Box';
import Button from '../shared/Buttons';
import Card from '../shared/Card';
import Flex from '../shared/Flex';
import FlexContainer from '../shared/FlexContainer';
import FlexRow from '../shared/FlexRow';
import SubTitle from '../shared/SubTitle';
import Text from '../shared/Text';
import Title from '../shared/Title';
import customStyles from './events.module.scss';

const RowItem = styled(Box).attrs({
  padding: [1, 2]
})``

export default (
  { event, city, joined, fetchUserEvents }:
    { event: TechEvent, city: City, joined: boolean, fetchUserEvents: Function }) => {
  const [open, setModal] = useState(false)
  const [cancel, setCancel] = useState(false)
  const { startDate, name, isFree, endDate } = event

  const formatDuration = (minutes: number): string => {
    const hours: number = Math.floor(minutes / 60)
    const rest: number = minutes % 60
    return rest !== 0 ? `${hours}h ${rest}m` : `${hours}h`
  }

  const onOpenJoinModal = () => {
    setCancel(false)
    setModal(true)
  };

  const onCloseModal = () => {
    setModal(false)
  };

  const onOpenLeaveModal = () => {
    setCancel(true)
    setModal(true)
  };

  const onJoinEvent = async () => {
    try {
      await axios.post('http://localhost:3001/user', event)
      await fetchUserEvents()
      setModal(false)
    } catch (e) {
      setModal(false)
    }
  }

  const onLeaveEvent = async () => {
    try {
      await axios.delete(`http://localhost:3001/user/${event.id}`)
      await fetchUserEvents()
      setModal(false)
    } catch (e) {
      setModal(false)
    }
  }

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
            <SubTitle ml={1}>
              {isFree && !joined && <Text color="darkGreen">Free!!!</Text>}
              {joined && <Text color="darkGreen">You're in!</Text>}
            </SubTitle>
          </Box>
        </RowItem>
        <RowItem sx={{
          display: 'flex',
          flexDirection: ['row', 'column'],
          justifyContent: ['space-around'],
          flex: '1 1 auto',
          alignItems: ['center']
        }}>
          {!joined && <Button variant='primaryInverted' onClick={onOpenJoinModal}>Sign up</Button>}
          {joined && <Button variant='primary' onClick={onOpenLeaveModal}>Leave</Button>}
        </RowItem>
      </FlexRow>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        animationDuration={500}
        classNames={{
          transitionEnter: customStyles.transitionEnter,
          transitionEnterActive: customStyles.transitionEnterActive,
          transitionExit: customStyles.transitionExitActive,
          transitionExitActive: customStyles.transitionExitActive,
          overlay: customStyles.customOverlay,
          modal: customStyles.customModal,
        }}
      >
        <Card>
          <Flex py={[3]} sx={{ justifyContent: 'center', background: 'lightGreen' }}>
            {!cancel && <Title>Join the event</Title>}
            {cancel && <Title>Leave the event</Title>}
          </Flex>
          <FlexContainer minHeight={'35vh'} p={[2, 3, 4]}>
            <SubTitle style={{ display: 'inline-block' }}>
              {!cancel && `You are about to sign up for `}
              {cancel && `You are about to leave `}
            </SubTitle>
            <SubTitle style={{ display: 'inline-block' }} color="orange">
              {name}
            </SubTitle>
            <SubTitle style={{ display: 'inline-block' }}>
              {!cancel && ` This event takes place on the `}
              {!cancel && <Moment format="Do MMMM">{startDate}</Moment>}{!cancel && ` in ${city.name}.`}<br /><br />Are you sure?
            </SubTitle>
          </FlexContainer>
          <Flex py={[3]} sx={{ justifyContent: 'flex-end' }}>
            <Box sx={{ flex: ['30% 0 0', '25% 0 0'], textAlign: 'center' }}>
              <Button minWidth={[84]} variant='primaryInverted' onClick={onCloseModal}>Cancel</Button>
            </Box>
            <Box sx={{ flex: ['30% 0 0', '25% 0 0'], textAlign: 'center' }}>
              {!cancel && <Button minWidth={[84]} variant='secondaryInverted' onClick={onJoinEvent}>Join</Button>}
              {cancel && <Button minWidth={[84]} variant='warningInverted' onClick={onLeaveEvent}>Leave</Button>}
            </Box>
          </Flex>
        </Card>
      </Modal>
    </Fragment>
  )
}