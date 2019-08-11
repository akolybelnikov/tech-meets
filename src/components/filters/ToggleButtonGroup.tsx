import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import styled from 'styled-components';
import { Hours } from '../../models/Hours';
import { HoursRange, mapRangeToHours } from '../../models/Range';
import { filtersService } from '../../services/filters.service';
import Box from '../shared/Box';
import Text from '../shared/Text';

const Button = styled(ToggleButton)`
    background-color: ${props => props.theme.colors.lightBlue};
    border-color: ${props => props.theme.colors.lightBlue};
    &.active, &:hover {
        background-color: ${props => props.theme.colors.darkBlue} !important;
        border-color: ${props => props.theme.colors.darkBlue} !important;
    }
    @media all and (max-width: 600px) {
        padding: .375rem .5rem !important;
        font-size: 0.85rem !important;
    }
`

const Group = forwardRef(({ setEvents }: { setEvents: Function }, ref) => {
    const [value, setValue] = useState(Array<number>());

    useImperativeHandle(ref, () => ({
        reset() {
            setValue([])
            setTimeOfTheDay([])
            setEvents()
        }
    }))

    const handleChange = (val: number[]) => {
        setValue(val)
        setTimeOfTheDay(val)
        setEvents()
    }

    const setTimeOfTheDay = (val: number[]): void => {
        if (val.length || val.length !== 4) {
            const hours: Hours[] = []
            val.forEach(range => hours.push(mapRangeToHours(HoursRange[range])))
            filtersService.setHours(hours)
        }
    }

    return (
        <Box px={[1, 0]}>
            <Text py={[3]}>Filter events by the time of the day</Text>
            <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                <Button value={1}>6am - 12am</Button>
                <Button value={2}>12am - 5pm</Button>
                <Button value={3}>5pm - 9pm</Button>
                <Button value={4}>9pm - 6am</Button>
            </ToggleButtonGroup>
        </Box>
    )
})

export default Group