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
import Title from '../shared/Title'
import Text from '../shared/Text';
import customStyles from './events.module.scss'
import Card from '../shared/Card';
import Flex from '../shared/Flex';
import FlexContainer from '../shared/FlexContainer';
import axios, { AxiosResponse } from 'axios';

const RowItem = styled(Box).attrs({
  padding: [1, 2]
})``

export default ({ event, city }: { event: Event, city: City }) => {
  const [open, setModal] = useState(false)

  const { startDate, name, isFree, endDate } = event

  const formatDuration = (minutes: number): string => {
    const hours: number = Math.floor(minutes / 60)
    const rest: number = minutes % 60
    return rest !== 0 ? `${hours}h ${rest}m` : `${hours}h`
  }

  const onOpenModal = () => {
    setModal(true)
  };

  const onCloseModal = () => {
    setModal(false)
  };

  const onSaveEvent = async () => {
    const res: AxiosResponse = await axios.post('http://localhost:3001/user', event)

    console.log(res)

    setModal(false)
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
            <Title>Join the event</Title>
          </Flex>
          <FlexContainer minHeight={'35vh'} p={[2, 3, 4]}>
            <SubTitle style={{ display: 'inline-block' }}>
              {`You are about to sign up for `}
            </SubTitle>
            <SubTitle style={{ display: 'inline-block' }} color="orange">
              {name}
            </SubTitle>
            <SubTitle style={{ display: 'inline-block' }}>
              {` This event takes place on the `}
              <Moment format="Do MMMM">{startDate}</Moment>{` in ${city.name}.`}<br /><br />Are you sure?
            </SubTitle>
          </FlexContainer>
          <Flex py={[3]} sx={{ justifyContent: 'flex-end' }}>
            <Box sx={{ flex: ['30% 0 0', '25% 0 0'], textAlign: 'center' }}>
              <Button minWidth={[84]} variant='primaryInverted' onClick={onCloseModal}>Cancel</Button>
            </Box>
            <Box sx={{ flex: ['30% 0 0', '25% 0 0'], textAlign: 'center' }}>
              <Button minWidth={[84]} variant='primaryInverted' onClick={onSaveEvent}>Join</Button>
            </Box>
          </Flex>
        </Card>
      </Modal>
    </Fragment>
  )
}