import React, { useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Box from '../shared/Box';
import Text from '../shared/Text';
import styled from 'styled-components'

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

function Group({ toggle }: { toggle: Function }) {
    const [value, setValue] = useState([1, 3]);

    const handleChange = (val: number[]) => {
        toggle(val)
        setValue(val)
    }

    return (
        <Box>
            <Text py={[3]}>Filter events by the time of the day</Text>
            <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                <Button value={1}>6am - 12am</Button>
                <Button value={2}>12am - 17pm</Button>
                <Button value={3}>17pm - 21pm</Button>
                <Button value={4}>21pm - 6am</Button>
            </ToggleButtonGroup>
        </Box>
    )
}

export default Group