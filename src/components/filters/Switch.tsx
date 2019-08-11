import React, { useState,forwardRef, useImperativeHandle } from 'react';
import Switch from "react-switch";
import { AppTheme } from '../../theme';
import Text from '../shared/Text'
import styled from 'styled-components'
import Box from '../shared/Box';
import { filtersService } from '../../services/filters.service';

const Label = styled.label`
    display: flex;
    align-items: center;
`

const SwitchButton = forwardRef(({ filterEvents }: { filterEvents: Function }, ref) => {
    const [checked, setChecked] = useState(false)

    const handleChange = (checked: boolean) => {
        setChecked(checked)
        filtersService.setIsFree(checked)
        filterEvents()
    }

    useImperativeHandle(ref, () => ({
        reset() {
            setChecked(false)
            filtersService.setIsFree(false)
            filterEvents()
        }
    }))

    return (
        <Box py={[2]} px={[1]}>
            <Label htmlFor="material-switch">
                <Text color="darkBlue" mr={[2]}>All events</Text>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    onColor={`${AppTheme.colors.lightGreen}`}
                    offColor={`${AppTheme.colors.lightBlue}`}
                    onHandleColor={`${AppTheme.colors.darkGreen}`}
                    offHandleColor={`${AppTheme.colors.darkBlue}`}
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                />
                <Text color="darkGreen" ml={[2]}>Free!!!</Text>
            </Label>
        </Box>
    )
})

export default SwitchButton