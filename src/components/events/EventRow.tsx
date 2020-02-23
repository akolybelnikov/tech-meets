import axios from 'axios';
import { differenceInMinutes } from 'date-fns';
import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
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

export default (
    { event, joined, fetchUserEvents, leaveEvent }:
        { event: TechEvent, joined: boolean, fetchUserEvents: Function, leaveEvent: Function }) => {
    const [open, setModal] = useState(false)
    const { startDate, name, isFree, endDate } = event

    const formatDuration = (minutes: number): string => {
        const hours: number = Math.floor(minutes / 60)
        const rest: number = minutes % 60
        return rest !== 0 ? `${hours}h ${rest}m` : `${hours}h`
    }

    const onOpenModal = () => setModal(true)

    const onCloseModal = () => setModal(false)

    const onJoinEvent = async () => {
        try {
            await axios.post('https://tech-meets-api.herokuapp.com/user', event)
            await fetchUserEvents()
            setModal(false)
        } catch (e) {
            setModal(false)
        }
    }

    const onLeaveEvent = () => {
        leaveEvent(event.id)
    }

    return (
        <Fragment>
            <FlexRow style={{ zIndex: 1 }}>
                <Box p={[1, 2]} sx={{ flex: ['15%', '10%'] }}>
                    {startDate && <Moment utc format="HH:mm">
                        {startDate}
                    </Moment>}
                </Box>
                <Box p={[1, 2]} sx={{
                    display: 'flex',
                    flex: ['80%', '70%'],
                    justifyContent: 'flex-start'
                }}>
                    <Box sx={{ flex: ['60%'] }}>
                        <SubTitle>{name && name}</SubTitle>
                        <Box mt={[1]} sx={{ flex: '50%' }}>
                            <Text>{event.cityName} - {startDate && endDate && formatDuration(
                                differenceInMinutes(endDate, startDate)
                            )}</Text>
                        </Box>
                    </Box>
                    <Box sx={{
                        flex: '10%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <SubTitle ml={1}>
                            {isFree && !joined && <Text color="darkGreen">Free!!!</Text>}
                            {joined && <Text color="darkGreen">You're in!</Text>}
                        </SubTitle>
                    </Box>
                </Box>
                <Box p={[1, 2]} sx={{
                    display: 'flex',
                    flexDirection: ['row', 'column'],
                    justifyContent: ['space-around'],
                    flex: '1 1 auto',
                    alignItems: ['center']
                }}>
                    {!joined &&
                        <Button variant='primaryInverted' onClick={onOpenModal}>
                            Sign up
            </Button>
                    }
                    {joined &&
                        <Button variant='primary' onClick={onLeaveEvent}>
                            Leave
            </Button>
                    }
                </Box>
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
                    <Flex
                        py={[3]}
                        sx={{
                            justifyContent: 'center',
                            background: 'lightGreen'
                        }}>
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
                            {startDate && <Moment format="Do MMMM">{startDate}</Moment>}
                            {` in ${event.cityName}.`}<br /><br />Are you sure?
            </SubTitle>
                    </FlexContainer>
                    <Flex py={[3]} sx={{ justifyContent: 'flex-end' }}>
                        <Box sx={{ flex: ['30% 0 0', '25% 0 0'], textAlign: 'center' }}>
                            <Button
                                minWidth={[84]}
                                variant='primaryInverted'
                                onClick={onCloseModal}>
                                Cancel
                </Button>
                        </Box>
                        <Box sx={{ flex: ['30% 0 0', '25% 0 0'], textAlign: 'center' }}>
                            <Button
                                minWidth={[84]}
                                variant='secondaryInverted'
                                onClick={onJoinEvent}>
                                Join
                </Button>
                        </Box>
                    </Flex>
                </Card>
            </Modal>
        </Fragment>
    )
}